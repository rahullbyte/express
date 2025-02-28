import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import helmet from "helmet";
import cluster from 'cluster'; // Node's built-in cluster module
import os from 'os'; // For CPU core count
import usersRouter from './routes/users.js';

const numCPUs = os.cpus().length; // Number of CPU core
const port = 3000;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart dead worker
    });
} else {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-cdn.com"]
        }
    }));
    app.use(session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/expressApp' }),
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }
    }));

    app.use('/users', usersRouter);

    app.listen(port, () => {
        console.log(`Worker ${process.pid} running on port ${port}`);
    });
}
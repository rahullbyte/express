import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import MongoStore from 'connect-mongo'
import bcrypt from 'bcrypt'
import helmet from "helmet";

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(helmet()); // Apply all Helmet defaults globally
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "trusted-cdn.com"]
//     }
// }));

app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized : false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/expressApp' }),
    cookie: {
        secure: false,       // Set to true with HTTPS
        httpOnly: true,      // Prevent JS access
        sameSite: 'strict',  // Mitigate CSRF
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

// Signup with bcrypt
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const db = await connectDB();
    const result = await db.collection('users').insertOne({ username, password: hashed });
    res.json({ message: 'User created', id: result.insertedId });
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectDB();
    const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = { username };
        res.json({ message: 'Logged in' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/profile', (req, res) => {
    if (req.session.user) res.json({ user: req.session.user });
    else res.status(403).json({ message: 'Not logged in' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

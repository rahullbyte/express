import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import MongoStore from 'connect-mongo'

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized : false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/expressApp' })
}))

const url = 'mongodb://localhost:27017';
const dbName = 'expressApp';

async function connectDB() {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
}

// app.post('/signup', async (req, res, next)=>{
//     try {
//         const db = await connectDB();
//         const {username, password} =req.body;

//         const user = {username, password};

//         const result= await db.collection('users').insertOne(user)
//         res.json({message: 'User created', id: result.insertedId})

//     } catch (error) {
//         next(new Error('Signup failed'))
//     }
// })

// app.post ('/login', async (req, res, next)=>{
//     try {
//         const db = await connectDB();
//         const {username, password}= req.body;
//         const user = await db.collection('users').findOne({username, password});

//         if(user){
//             req.session.user = user;
//             res.json({message: 'Logged in Successful'})
//         }else{
//             res.status(401).json({message: 'Invalid Credentials'})
//         }
//     } catch (error) {
//         next (new Error('Login failed'))
//     }
// })

// app.get('/profile', (req, res)=>{
//     if(req.session.user){
//         res.json({message: `Welcome, ${req.session.user.username}!`})
//     }else{
//         res.status(403).json({message: 'Please log in'})
//     }
// })

// app.get('/logout', (req, res)=>{
//     req.session.destroy(()=>{
//         res.json({message: 'Logged out'})
//     })
// })


//Using the Session store on mongodb not in Ram

app.get('/login', (req, res) => {
    req.session.user = { username: 'bob', loggedInAt: new Date() };
    res.send('Logged in with session!');
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(403).send('Not logged in');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out');
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

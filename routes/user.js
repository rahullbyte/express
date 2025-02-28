import express from 'express';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

const router = express.Router();

async function connectDB() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    return client.db('expressApp');
}

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const db = await connectDB();
        const result = await db.collection('users').insertOne({ username, password: hashed });
        res.json({ message: 'User created', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await connectDB();
        const user = await db.collection('users').findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { username };
            res.json({ message: 'Logged in' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/profile', (req, res) => {
    if (req.session.user) res.json({ user: req.session.user });
    else res.status(403).json({ message: 'Not logged in' });
});

export default router;
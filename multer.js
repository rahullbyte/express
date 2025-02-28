import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.use(express.json());

const url = "mongodb://localhost:27017";
const dbName = "expressApp";

async function connectDB() {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
}



app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

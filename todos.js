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

//create
app.post("/todos", async (req, res, next) => {
    try {
        const db = await connectDB();
        const { task } = req.body;
        const result = await db
            .collection("todos")
            .insertOne({ task, done: false });
        res.status(201).json({ id: result.insertedId, task, done: false });
    } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});

//read all

app.get("/todos", async (req, res, next) => {
    try {
        const db = await connectDB();
        const todos = await db.collection("todos").find().toArray();
        res.json(todos);
    } catch (error) {
        res.status(400).json({ error: "Todos not found" });
    }
});

//read one
app.get("/todos/:id", async (req, res, next) => {
    try {
        const db = await connectDB();
        const id =new ObjectId(req.params.id);
        const todo = await db.collection("todos").findOne({ _id: id });
        if (todo) {
            res.json(todo);
        } else {
            res.status(405).json({ error: "todo not found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Failed to fetch todo." });
    }
});

//update
app.put("/todos/:id", async (req, res, next) => {
    try {
        const db = await connectDB();
        const Id = new ObjectId(req.params.id);
        const { task, done } = req.body;
        const result = await db
            .collection("todos")
            .updateOne({ _id: Id }, { $set: { task, done } });
        if (result.modifiedCount) {
            res.json({ message: "Todo Updated!" });
        } else {
            res.status(404).json({ error: "Todo not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo." });
    }
});

app.delete("/todos/:id", async (req, res, next) => {
    try {
        const db = await connectDB();
        const iT = new ObjectId(req.params.id);
        const result = await db.collection("todos").deleteOne({ _id: iT });
        if (result.deletedCount) {
            res.json({ message: "Todo deleted" });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

// app.use((req, res, next) => {
//        next(202);
// });

// const apiCodes =[
//     {code: 200, message: "Done"},
//     {code: 400, message: "unauthorized"},
//     {code: 500, message: "invalid"},
//     {code: 202, message: "created"},
//     {code: 403, message: "false"},
// ]

// app.use((err, req, res, next) => {

//    const match = apiCodes.find(item => item.code === err);

//     if (match) {
//         res.status(match.code).send(match.message);
//     } else {
//         res.status(500).send("Unknown error");
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Hello world!')
// })

// // GET request to the root path
// app.get("/", (req, res) => {
//   res.send("Hello, this is the homepage!");
// });

// // GET request to /about
// app.get('/about', (req, res) => {
//     res.send('This is the about page.');
// });

// app.get('/submit', (req, res, next)=>{
//     res.send('data Submitted')
// })

// app.get('*', (req, res, next)=>{
//     res.send('404- page Not Found')
// })

// app.get('/test', (req, res, next)=>{
//     console.log(`Method: ${req.method}`)

//     console.log(`URL: ${req.url}`);

//     res.status(200).json({
//         message: 'Test Successful',
//         method: req.method
//     })
// })

// app.get('/user/:id', (req, res)=>{
//     const userId = req.params.id;
//     res.send(`User ID: ${userId}`)
// })

// app.get("/search", (req, res) => {
//   const query = req.query.q;

//   res.send(`You Searched for ${query}`);
// });

// app.get('/error',(req, res, next)=>{
//   const err = new Error('Something went wrong!');
//   err.status = 400;
//   next(err)
// })

// app.use((err, req, res, next)=>{
//   res.status(err.status || 500).json({
//     error: err.message
//   })
// })

//A small app

// app.use((req, res, next)=>{
//   console.log(`${req.method} ${req.url}`);
//   next();
// })

// app.use(express.static('public'));

// app.get('/', (req, res)=>{
//   res.send('Welcome to the API!')
// })

// app.get('/user/:id', (req, res)=>{
//   res.json({
//     id: req.params.id,
//     message: `Hello, user ${req.params.id}`
//   })
// })

// app.get('/search', (req, res)=>{
//   const query = req.query.q || 'nothing';
//   res.send(`Search result for: ${query}`)
// })

// app.get('/fail', (req, res, next)=>{
//   next(new Error('Intentional failure'))
// })

// app.use((err, req, res, next)=>{
//   res.status(err.status || 500).json({
//     error: err.message
//   })
// })

// app.get('*', (req, res, next)=>{
//   res.send('404- Not found')
// })

// app.use(express.json());

// app.post('/submit', (req, res) => {
//   const data = req.body; 
//   res.json({
//       received: data,
//       message: 'Data received successfully'
//   });
// });

// app.use(express.urlencoded({ extended: true })); 

// app.post('/form', (req, res) => {
//     const { username } = req.body;
//     res.send(`Hello, ${username}!`);
// });

// app.set('view engine', 'ejs');

// app.get('/greet/:name', (req, res) => {
//     const name = req.params.name;
//     res.render('greet', { user: name });
// });


// const url = 'mongodb://localhost:27017';
// const dbName = 'expressApp';

// app.use(express.json())

// // Database connection function
// async function connectDB() {
//   try {
//       const client = await MongoClient.connect(url);
//       console.log('Connected to MongoDB');
//       return client.db(dbName);
//   } catch (err) {
//       console.error('Failed to connect to MongoDB:', err);
//       throw err; // Let the caller handle the error
//   }
// }

// // POST route to add a user
// app.post('/users', async (req, res, next) => {
//   try {
//       const db = await connectDB();
//       console.log('Request body:', req.body);
//       const result = await db.collection('users').insertOne(req.body);
//       res.json({ id: result.insertedId, message: 'User added' });
//   } catch (err) {
//       console.error('POST /users error:', err); 
//       next(new Error('Database error'));
//   }
// });

// // GET route to fetch a user
// app.get('/users/:id', async (req, res, next) => {
//   try {
//       const db = await connectDB();
//       console.log('Requested ID:', req.params.id);
//       const id = parseInt(req.params.id);
//       const user = await db.collection('users').findOne({ _id: id });
//       if (user) res.json(user);
//       else res.status(404).send('User not found');
//   } catch (err) {
//       console.error('GET /users/:id error:', err); 
//       next(new Error('Database error'));
//   }
// });

// // Error middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

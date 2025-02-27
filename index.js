import express from "express"

const app = express()
const port = 3000

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

// GET request to the root path
app.get('/', (req, res) => {
    res.send('Hello, this is the homepage!');
});

// GET request to /about
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
    
})
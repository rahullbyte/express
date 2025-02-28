import express from "express";
import multer from "multer";
import fs from 'fs'

const app = express();
const port = 3000;

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+ '-'+file.originalname);
    }
})

const upload = multer({storage});

if(!fs.existsSync('uploads')) fs.mkdirSync('uploads')

app.post('/upload', upload.single('file'), (req, res)=>{
    res.json({message : 'File upload', filename:  req.file.fieldname})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

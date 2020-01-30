const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid');

const app = express();
// Destination path needs to be set on prod
const uploadPath = '/Users/MattPo/Documents/Uploads'

app.use(bodyParser.urlencoded({extended: true}));

// Set Storage to store files
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadPath)
    },
    filename: function(req, file, cb){
        cb(null, `${uuid()}.mp4`)
    }
})

var upload = multer({storage: storage});

// TODO: post call needs to return JobId?
app.post('/uploadfile', upload.any(), (req, res) => {
    // console.log('file received');
    return res.send({
    success: true
    })
});

app.listen(3000, () => console.log("Server started on port 3000"));

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');
const axios = require('axios');
const rimraf = require("rimraf");
const sleep = require('sleep');

const uploadPath = '/app/uploads/'
var fileName = '';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Set Storage to store files
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        fileName = uuid();
        var dirName = `${uploadPath}${fileName}`;
        fs.mkdir(dirName, function(err){
            if(err) throw err;
        });
        cb(null, dirName)
    },
    filename: function(req, file, cb){
        cb(null, `${fileName}.mp4`)
    }
})

var upload = multer({storage: storage});

app.post('/uploadfile', upload.any(), (req, res) => {
    var file = req.files[0];
    var fileName = file.originalname;
    var jobId = file.filename.split(".")[0];

    createJob(jobId).then(function(response){
        var success = response;
        sleep.msleep(50);
        // Dev Error 100: failed to create job.
        if (success === false){
            rimraf(`/app/uploads/${jobId}`, function() {});
            return res.send({
                status: "Error",
                message: "Failed to upload video. (Dev Error 100)"
            })
        }
        else{
            return res.send({
                status: "File Received",
                file_name: fileName,
                job_id: jobId,
                created_on: Date.now()
            })
        } 
    })

    
});

app.listen(3000, () => console.log("Server started on port 3000"));

function createJob(jobId){
    return axios.post('http://localhost:5001/create-job', null, { params: {jobId} })
    .then(response => {
        // console.log(response.data);
        return true;
    })
    .catch(response => {
        // TODO: log error?
        return false;
    }
);
}

//aggregates.js routes
const express = require('express');
const fs = require('fs');

const videos = express.Router();

//Current Route
videos.get('/', (req,res,next) => {
    obj = JSON.parse(fs.readFileSync('./data/videosDetails.json', 'utf8'));
	res.send(obj);
});

videos.get('/:videoId', (req,res,nex) => {

	var obj = JSON.parse(fs.readFileSync('./data/videosDetails.json', 'utf8'));

    obj.results.forEach(function(video){

        if(video.id == req.params.videoId) {
            res.send({datetime : obj.datetime, [req.params.videoId] : video});
            return;
        }
    });

  res.status(404).send(`Response 404: video id '${req.params.videoId}' is not found`);    
        
	
});


module.exports = videos;
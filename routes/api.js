//lousticapi.js routes

const express = require('express');
const ytlsapi = require('../yt-ls-api.js');
const apiRouter = express.Router();

//forwarding routes
const aggregates = require('./aggregates.js');
apiRouter.use('/aggregates',aggregates);

const videos = require('./videos.js');
apiRouter.use('/videos',videos);


//Current Route
apiRouter.get('/',(req,res,next) => {
	res.send('Loustic Sessions API');
});


//resource controller to perform an action (refresh data from youtube so it can be used by other /api/<resources>
apiRouter.post('/refresh-data',(req,res,next) => {
	var aggregatePromise = ytlsapi.aggregate();
    aggregatePromise.then(function(result) {
        var r = {
			code : '200',
			message: 'All data has been refreshed',
			url: ['/api/aggregates','/api/videos']
		};
		res.send(r);
		
    }, function(err) {
        res.status(500).send(err);
    })
});


module.exports = apiRouter;
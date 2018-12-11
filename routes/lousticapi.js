//lousticapi.js routes

const express = require('express');
const lousticApiRouter = express.Router();

//forwarding routes
const aggregates = require('./aggregates.js');
lousticApiRouter.use('/aggregates',aggregates);


//Current Route
lousticApiRouter.get('/',(req,res,next) => {
	res.send('Loustic Sessions API');
});


module.exports = lousticApiRouter;
//lousticapi.js routes

const express = require('express');
const apiRouter = express.Router();

//forwarding routes
const aggregates = require('./aggregates.js');
apiRouter.use('/aggregates',aggregates);


//Current Route
apiRouter.get('/',(req,res,next) => {
	res.send('Loustic Sessions API');
});


module.exports = apiRouter;
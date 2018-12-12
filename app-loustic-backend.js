//Loustic backend API
//npm install express

const express = require('express');
const app = express();


//forwarding routes
const lousticapi = require('./routes/api.js');
app.use('/api',lousticapi);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://friachi.github.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



//current Route
app.get('/',(req,res,next) => {
	
	res.send('Loustic Sessions Server');
});


app.listen(8080,()=> console.log('Listening on port 8080...'));
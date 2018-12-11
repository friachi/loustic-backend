//Loustic backend API
//npm install express

const express = require('express');
const app = express();


//forwarding routes
const lousticapi = require('./routes/lousticapi.js');
app.use('/lousticapi',lousticapi);


//current Route
app.get('/',(req,res,next) => {
	
	res.send('Loustic Sessions Server');
});


app.listen(8080,()=> console.log('Listening on port 8080...'));
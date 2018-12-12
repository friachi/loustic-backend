//Loustic backend API
//npm install express

const express = require('express');
var cors = require('cors');
const app = express();

//allow CORS on ALL routes
app.use(cors())

//forwarding routes
const lousticapi = require('./routes/api.js');
app.use('/api',lousticapi);



//current Route
app.get('/',(req,res,next) => {
	
	res.send('Loustic Sessions Server');
});


app.listen(8080,()=> console.log('Listening on port 8080...'));
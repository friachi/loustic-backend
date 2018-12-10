//Loustic backend API
//npm install express

const express = require('express');
const ytlsapi = require('./yt-ls-api.js');
const fs = require('fs');

const app = express();

//defines and handles operatiosn on resource: aggregates
app.use(require('./routes/aggregates.js'));


app.listen(8080,()=> console.log('Listening on port 8080...'));
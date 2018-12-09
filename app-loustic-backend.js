//Loustic backend API

const express = require('express');
const ytlsapi = require('./yt-ls-api.js');
const fs = require('fs');


const app = express();

app.get('/loustic-backend/aggregates/run', (req,res) => {
	ytlsapi.aggregate();
	res.send('aggregating...');
});

app.get('/loustic-backend/aggregates/by-artists-roots', (req,res) => {
	
	var obj = JSON.parse(fs.readFileSync('aggrByArtistsFrom.json', 'utf8'));
	res.send(obj);
});


app.get('/loustic-backend/aggregates/by-recorded-in', (req,res) => {
	
	var obj = JSON.parse(fs.readFileSync('aggrByRecordedIn.json', 'utf8'));
	res.send(obj);
});


app.get('/loustic-backend/aggregates/not-tagged-yet', (req,res) => {
	
	var obj = JSON.parse(fs.readFileSync('notTaggedYet.json', 'utf8'));
	res.send(obj);
});

app.listen(8080,()=> console.log('Listening on port 8080...'));
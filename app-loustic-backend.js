//Loustic backend API
//npm install express

const express = require('express');
const ytlsapi = require('./yt-ls-api.js');
const fs = require('fs');


const app = express();

app.get('/loustic-backend/aggregates', (req,res) => {
	var json = { 'aggregates' : [
		{	id : 'by-artists-roots',
			description: 'Aggregate Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code' 
			},
		{	id : 'by-recorded-in',
			description: 'Aggregate Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code' 
			},
		{	id : 'not-tagged-yet',
			description: 'Retruns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation' 
			}
		]
  };
	res.send(json);
});

app.put('/loustic-backend/aggregates/run', (req,res) => {
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
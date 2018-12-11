//aggregates.js routes
const express = require('express');
const ytlsapi = require('../yt-ls-api.js');
const fs = require('fs');

const aggregates = express.Router();

//Current Route
aggregates.get('/', (req,res,next) => {
	var json = { 'aggregates' : [
		{	id : 'by-artists-roots',
			description: 'Aggregate Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/lousticapi/aggregates/by-artists-roots'
			},
		{	id : 'by-recorded-in',
			description: 'Aggregate Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/lousticapi/aggregates/by-recorded-in' 
			},
		{	id : 'not-tagged-yet',
			description: 'Retruns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation',
			url: '/lousticapi/aggregates/not-tagged-yet'
			}
		]
  };
	res.send(json);
});

aggregates.get('/:id', (req,res,nex) => {

	var obj;

	switch(req.params.id) {
    case "by-artists-roots":
        obj = JSON.parse(fs.readFileSync('./data/aggrByArtistsFrom.json', 'utf8'));
		res.send(obj);
        break;
    case "by-recorded-in":
        obj = JSON.parse(fs.readFileSync('./data/aggrByRecordedIn.json', 'utf8'));
		res.send(obj);
        break;
    case "not-tagged-yet":
        obj = JSON.parse(fs.readFileSync('./data/notTaggedYet.json', 'utf8'));
		res.send(obj);
        break;
    default:
        res.status(404).send(`Response 404: Aggregate id '${req.params.id}' is not found`);
}
	
});

aggregates.put('/', (req,res,nex) => {
	
	var aggregatePromise = ytlsapi.aggregate();
    aggregatePromise.then(function(result) {
        var r = {
			code : '200',
			message: 'All aggregates have been updated',
			url: '/lousticapi/aggregates'
		};
		res.send(r);
		
    }, function(err) {
        res.status(500).send(err);
    })
});

module.exports = aggregates;
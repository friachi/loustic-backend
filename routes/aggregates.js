//aggregates.js routes
const express = require('express');
const ytlsapi = require('../yt-ls-api.js');
const fs = require('fs');

const aggregates = express.Router();

//Current Route
aggregates.get('/', (req,res,next) => {
	var json = { 'aggregates' : [
		{	id : 'by-artists-roots',
			description: 'Aggregate of Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/api/aggregates/by-artists-roots'
			},
		{	id : 'by-recorded-in',
			description: 'Aggregate of Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/api/aggregates/by-recorded-in' 
			},
		{	id : 'by-genre',
			description: 'Aggregate of Loustic Sessions videos based on musical genres',
			url: '/api/aggregates/by-genre'
			},
		{	id : 'not-tagged-yet',
			description: 'Retuns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation',
			url: '/api/aggregates/not-tagged-yet'
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
    case "by-genre":
        obj = JSON.parse(fs.readFileSync('./data/aggrByGenre.json', 'utf8'));
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

aggregates.get('/:id/:item', (req,res,nex) => {

	var obj;

	switch(req.params.id) {
    case "by-artists-roots":
        obj = JSON.parse(fs.readFileSync('./data/aggrByArtistsFrom.json', 'utf8'));
        if(obj.aggregate[req.params.item]){
        	res.send({aggregateId: req.params.id ,datetime : obj.datetime, [req.params.item] : obj.aggregate[req.params.item]});
        }else
        	res.status(404).send(`Response 404: item '${req.params.item}' is not found in Aggregate id '${req.params.id}'`);	
        break;
    case "by-recorded-in":
        obj = JSON.parse(fs.readFileSync('./data/aggrByRecordedIn.json', 'utf8'));
        if(obj.aggregate[req.params.item]){
        	res.send({aggregateId: req.params.id ,datetime : obj.datetime, [req.params.item] : obj.aggregate[req.params.item]});
        }else
        	res.status(404).send(`Response 404: item '${req.params.item}' is not found in Aggregate id '${req.params.id}'`);
        break;
    case "by-genre":
        obj = JSON.parse(fs.readFileSync('./data/aggrByGenre.json', 'utf8'));
        if(obj.aggregate[req.params.item]){
        	res.send({aggregateId: req.params.id ,datetime : obj.datetime, [req.params.item] : obj.aggregate[req.params.item]});
        }else
        	res.status(404).send(`Response 404: item '${req.params.item}' is not found in Aggregate id '${req.params.id}'`);
        break;
    case "not-tagged-yet":
        obj = JSON.parse(fs.readFileSync('./data/notTaggedYet.json', 'utf8'));
		res.send(obj);
        break;
    default:
        res.status(404).send(`Response 404: Aggregate id '${req.params.id}' is not found`);
}
	
});

aggregates.post('/', (req,res,nex) => {
	
	var aggregatePromise = ytlsapi.aggregate();
    aggregatePromise.then(function(result) {
        var r = {
			code : '200',
			message: 'All aggregates have been updated',
			url: '/api/aggregates'
		};
		res.send(r);
		
    }, function(err) {
        res.status(500).send(err);
    })
});

module.exports = aggregates;
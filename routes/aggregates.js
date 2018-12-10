const express = require('express');
const router = express.Routes;


router.get('/loustic-backend/aggregates', (req,res) => {
	var json = { 'aggregates' : [
		{	id : 'by-artists-roots',
			description: 'Aggregate Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/loustic-backend/aggregates/by-artists-roots'
			},
		{	id : 'by-recorded-in',
			description: 'Aggregate Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code',
			url: '/loustic-backend/aggregates/by-recorded-in' 
			},
		{	id : 'not-tagged-yet',
			description: 'Retruns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation',
			url: '/loustic-backend/aggregates/not-tagged-yet'
			}
		]
  };
	res.send(json);
});

router.get('/loustic-backend/aggregates/:id', (req,res) => {

	var obj;

	switch(req.params.id) {
    case "by-artists-roots":
        obj = JSON.parse(fs.readFileSync('aggrByArtistsFrom.json', 'utf8'));
		res.send(obj);
        break;
    case "by-recorded-in":
        obj = JSON.parse(fs.readFileSync('aggrByRecordedIn.json', 'utf8'));
		res.send(obj);
        break;
    case "not-tagged-yet":
        obj = JSON.parse(fs.readFileSync('notTaggedYet.json', 'utf8'));
		res.send(obj);
        break;
    default:
        res.status(404).send(`Response 404: Aggregate id '${req.params.id}' is not found`);
}
	
});

router.put('/loustic-backend/aggregates', (req,res) => {
	
	var aggregatePromise = ytlsapi.aggregate();
    aggregatePromise.then(function(result) {
        var r = {
			code : '200',
			message: 'All aggregates have been updated',
			url: '/loustic-backend/aggregates'
		};
		res.send(r);
		
    }, function(err) {
        res.status(500).send(err);
    })
});

module.exports = router;
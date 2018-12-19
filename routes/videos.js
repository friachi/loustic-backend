//aggregates.js routes
const express = require('express');
const fs = require('fs');

const videos = express.Router();

//Current Route
videos.get('/', (req,res,next) => {
	
	obj = JSON.parse(fs.readFileSync('./data/videosDetails.json', 'utf8'));
	
	if(Object.keys(req.query).length === 0){
		//no query provided, thus return all videos
		res.send(obj);
	}
	else{

		var results = {};

		if(req.query.search)
		{
				
			results = search(obj,req.query);
			res.send(results);	
		}
		else
		{
			res.send(obj);
		}
		
		
		
	}
		
	
});

videos.get('/:videoId', (req,res,nex) => {

	var obj = JSON.parse(fs.readFileSync('./data/videosDetails.json', 'utf8'));

    obj.results.forEach(function(video){

        if(video.id == req.params.videoId) {
            res.send({datetime : obj.datetime, [req.params.videoId] : video});
            return;
        }
    });

  res.status(404).send(`Response 404: video id '${req.params.videoId}' is not found`);    
        
	
});

function search(obj,query)
{
	//here are the searchable fields:
	
	//title
	//description
	//tags

	
	var found = [];
	
		
		//searching all fields
		obj.results.forEach(function(item){
			var titleFound = false;
			var descriptionFound = false;
			var tagsFound = false;
				
				//if found in title
				if(item.snippet.title.toLowerCase().indexOf(query.search.toLowerCase()) != -1){
					titleFound = true;
				}
				
				//if found in description
				if(item.snippet.description.toLowerCase().indexOf(query.search.toLowerCase()) != -1){
					descriptionFound = true;
				}
				
				//if found in tags
				if(item.snippet.tags)
				{
					var tagstring = item.snippet.tags.join(",");
					if(tagstring.toLowerCase().indexOf(query.search.toLowerCase()) != -1){
						tagsFound = true;
					}
					
				}
				

			//return results based on user query
			if(query.fields)
			{
				if(query.fields.indexOf(",") != -1)
				{
					//many fields search
					//var fields = query.fields.split(",")
					if(query.fields.toLowerCase().indexOf("title") != -1 && query.fields.toLowerCase().indexOf("description") != -1)
					{
						if(titleFound || descriptionFound) 
						{
							found.push(item);
						}
					}
					
					if(query.fields.toLowerCase().indexOf("title") != -1 && query.fields.toLowerCase().indexOf("tags") != -1)
					{
						if(titleFound || tagsFound) 
						{
							found.push(item);
						}
					}
					
					if(query.fields.toLowerCase().indexOf("description") != -1 && query.fields.toLowerCase().indexOf("tags") != -1)
					{	
						
						if(descriptionFound || tagsFound) 
						{
							found.push(item);
						}
					}
					
				}
				else
				{	
					//one field search
					switch (query.fields.toLowerCase()) {
					  case 'title':
						if(titleFound) 
						{
							found.push(item);
						}
						break; 
					  case 'description':
						if(descriptionFound) 
						{
							found.push(item);
						}
						break;
					  case 'tags':
						if(tagsFound) 
						{
							found.push(item);
						}
						break; 												 
					}
							
				}
			
			
			}
			else
			{ //searching all fields
				if(titleFound || descriptionFound || tagsFound) 
					{
						found.push(item);
					}
					
			}		
			
		});
	
	var setOfResults = found;
	if(query.limit)
	{
		setOfResults = found.slice(0, query.limit);
	}
	return { totalFound:found.length, searchCriteria: query , searchableFields: ['title','description','tags'], results: setOfResults };
}


module.exports = videos;
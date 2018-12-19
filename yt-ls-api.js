//main.js
//npm install googleapis

const {google} = require('googleapis');
const fs = require('fs');
const moment = require('moment');
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCaS1doYIl5jqdUzowkGbawm2w-HEeQMJk' // specify your API key here
});

//Global variables

const playlistId='UUHziILhb2V5ahNIMSmaOAbQ'; //Loustic sessions 'Uploads' playlist
var nextPageToken, prevPageToken;
var videosDetails = {};
videosDetails.results = [];
var aggrByArtistsFrom = {};
var aggrByRecordedIn = {};
var aggrByGenre = {};
var notTaggedYet = [];
var now;

/////////////////////////////////////
/////// Main Functions ////////
/////////////////////////////////////

async function aggregate() {

now = moment().format(); 
//reset vars
nextPageToken = undefined;
prevPageToken = undefined;
videosDetails = {datetime: now};
videosDetails.results = [];
aggrByArtistsFrom = {aggregateId: 'by-artists-roots',datetime: now, aggregate: {}};
aggrByRecordedIn = {aggregateId: 'by-recorded-in',datetime: now, aggregate: {}};
aggrByGenre = {aggregateId: 'by-genre',datetime: now, aggregate: {}};
notTaggedYet = [];

console.log(`Requesting all uploaded videos on Loustic Sessions (${now})...`);

//read first page of video ids
const videoList = await requestVideoPlaylist(playlistId);

// ...get their video details and store in 'videosDetails'
await getVideosDetails(videoList);

//if more pages, loop on all (nextPageToken is being updated inside requestVideoPlaylist()
while(nextPageToken)
{
	const videoList = await requestVideoPlaylist(playlistId,nextPageToken);
	await getVideosDetails(videoList);
}


console.log('Data received.');

//aggregate videos count. It generates 2 objects: aggrByArtistsFrom & aggrByRecordedIn with the below structure:
//{ country : { videoCount,viewCount,likeCount,dislikeCount,favoriteCount,commentCount,videoIds:[strings]} }

console.log('Aggregating data based on tags...');

aggregateVideosPerCountry();

console.log('Aggregation done');

return new Promise(function(resolve, reject) {
//Write Data to files
	var json;

	//aggrByArtistsFrom.json
	
	json = JSON.stringify(aggrByArtistsFrom);
	fs.writeFile('./data/aggrByArtistsFrom.json', json, 'utf8', function (err) {
	    if (err) {
	        reject(err);
	    }
		console.log("Videos Aggregated by 'ArtistsFrom:' tag stored in aggrByArtistsFrom.json");
	});
	
	//aggrByRecordedIn.json
	
	json = JSON.stringify(aggrByRecordedIn);
	fs.writeFile('./data/aggrByRecordedIn.json', json, 'utf8', function (err) {
	    if (err) {
	        reject(err);
	    }
		console.log("Videos Aggregated by 'RecordedIn:' tag stored in aggrByRecordedIn.json");
	});

	//aggrByGenre.json
	
	json = JSON.stringify(aggrByGenre);
	fs.writeFile('./data/aggrByGenre.json', json, 'utf8', function (err) {
	    if (err) {
	        reject(err);
	    }
		console.log("Videos Aggregated by genre-related tags are stored in aggrByGenre.json");
	});
	
	//notTaggedYet.json
	json = JSON.stringify(notTaggedYet);
	fs.writeFile('./data/notTaggedYet.json', json, 'utf8', function (err) {
	    if (err) {
	        reject(err);
	    }
	console.log("Videos having missing or none of the required tags ae stored in notTaggedYet.json");
	});
	
	//videosDetails.json
	json = JSON.stringify(videosDetails);
	fs.writeFile('./data/videosDetails.json', json, 'utf8', function (err) {
	    if (err) {
	        reject(err);
	    }
	console.log("All Videos details are stored in videosDetails.json");
	});

	resolve("updated");
	console.log('All aggregate files are saved');
});

};


//this will run the method (for test only since this is a module)
//aggregate().catch(console.error);



/////////////////////////////////////
/////// underlying Functions ////////
/////////////////////////////////////

// Retrieve the list of videos in the specified playlist.
function requestVideoPlaylist(playlistId, pageToken) {
  var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 50
  };
  if (pageToken) {
    requestOptions.pageToken = pageToken;
  }
  return youtube.playlistItems.list(requestOptions)
		 .then(function(response) {
 
    nextPageToken = response.data.nextPageToken;
    prevPageToken = response.data.prevPageToken;
    var chunkOfVideoIds = '';
      var playlistItems = response.data.items;
      if (playlistItems) {
      var lastvidIndex = playlistItems.length - 1;
      var indx = 0;

      playlistItems.forEach(function(item) { 
		var videoId = item.snippet.resourceId.videoId;
		//store videoIds in a comma separated list of videos string
		if(indx == lastvidIndex) { 
		  //last iteration, don't add a comma
		   chunkOfVideoIds += videoId;
		}
		else 
		{
		  chunkOfVideoIds += videoId + ',';
		}
		indx++;
      });
	  
	 //the promise is to retrun a string with comma separated video ids
     return chunkOfVideoIds;
    } 
  });
}
// Retrieve the next page of videos in the playlist.
function getVideosDetails(viedoIds) {
	
      var requestOptions = {
        id: viedoIds,
        part: 'id,statistics,snippet',
        fields: 'items(id,statistics,snippet(title,description,tags,publishedAt,thumbnails(standard,high,maxres)))'
       };
       
       return youtube.videos.list(requestOptions)
		.then(function(response) {
       	response.data.items.forEach(function(value ){
		    videosDetails.results.push(value);
		});
		
       });
  
}
function aggregateVideosPerCountry(){
//will populate the below objects
//var aggrByArtistsFrom = {};
//var aggrByRecordedIn = {};
	var genres = ['african','arabic','asian','blues','soul','country','electronic','folk','hip hop','jazz','latin','pop','r&b','rock','classical','rap','traditional','indie','arab'];
	//go through all videos item

	videosDetails.results.forEach(function(video) {
		var tags = video.snippet.tags;
		if(tags){
			var ArtistsFromFound = false;
			var RecordedInFound = false;
			var GenreFound = false;
			var lastTagIndex = tags.length - 1;
			var tagIndex = 0;
			//go through all tags of this video
			tags.forEach(function(tag) {
			
			//start ArtistsFrom
			//check if video has 'ArtistsFrom:' tag, if yes, add it to aggregate
			if(tag.indexOf('ArtistsFrom:') !== -1) {
				ArtistsFromFound = true;
				var arr = tag.split(':');
				var country = arr[1];
				if(country) {
					if(aggrByArtistsFrom.aggregate.hasOwnProperty(country)){
						//aggregate already exists, thus increment it
						
						aggrByArtistsFrom.aggregate[country].videoCount += 1;
						aggrByArtistsFrom.aggregate[country].viewCount += parseInt(video.statistics.viewCount);
						aggrByArtistsFrom.aggregate[country].likeCount += parseInt(video.statistics.likeCount);
						aggrByArtistsFrom.aggregate[country].dislikeCount += parseInt(video.statistics.dislikeCount);
						aggrByArtistsFrom.aggregate[country].favoriteCount += parseInt(video.statistics.favoriteCount);
						aggrByArtistsFrom.aggregate[country].commentCount += parseInt(video.statistics.commentCount);
						aggrByArtistsFrom.aggregate[country].videoIds.push(video.id);
					}
					else{
						//aggregate is being added for first time, thus initialize it
						aggrByArtistsFrom.aggregate[country] = {};
						aggrByArtistsFrom.aggregate[country].videoCount = 1;
						aggrByArtistsFrom.aggregate[country].viewCount = parseInt(video.statistics.viewCount);
						aggrByArtistsFrom.aggregate[country].likeCount = parseInt(video.statistics.likeCount);
						aggrByArtistsFrom.aggregate[country].dislikeCount = parseInt(video.statistics.dislikeCount);
						aggrByArtistsFrom.aggregate[country].favoriteCount = parseInt(video.statistics.favoriteCount);
						aggrByArtistsFrom.aggregate[country].commentCount = parseInt(video.statistics.commentCount);
						aggrByArtistsFrom.aggregate[country].videoIds = [];
						aggrByArtistsFrom.aggregate[country].videoIds.push(video.id);
					}
				}
				else console.log("No country provided on 'ArtistsFrom:', or no colon . VideoId: " + video.id );
			}
			
			//start RecordedIn
			//check if video has 'RecordedIn:' tag, if yes, add it to aggregate
			else if(tag.indexOf('RecordedIn:') !== -1) {
				RecordedInFound = true;
				var arr = tag.split(':');
				var country = arr[1];
				if(country) {
					if(aggrByRecordedIn.aggregate.hasOwnProperty(country)){
						//aggregate already exists, thus increment it
						
						aggrByRecordedIn.aggregate[country].videoCount += 1;
						aggrByRecordedIn.aggregate[country].viewCount += parseInt(video.statistics.viewCount);
						aggrByRecordedIn.aggregate[country].likeCount += parseInt(video.statistics.likeCount);
						aggrByRecordedIn.aggregate[country].dislikeCount += parseInt(video.statistics.dislikeCount);
						aggrByRecordedIn.aggregate[country].favoriteCount += parseInt(video.statistics.favoriteCount);
						aggrByRecordedIn.aggregate[country].commentCount += parseInt(video.statistics.commentCount);
						aggrByRecordedIn.aggregate[country].videoIds.push(video.id);
					}
					else{
						//aggregate is being added for first time, thus initialize it
						aggrByRecordedIn.aggregate[country] = {};
						aggrByRecordedIn.aggregate[country].videoCount = 1;
						aggrByRecordedIn.aggregate[country].viewCount = parseInt(video.statistics.viewCount);
						aggrByRecordedIn.aggregate[country].likeCount = parseInt(video.statistics.likeCount);
						aggrByRecordedIn.aggregate[country].dislikeCount = parseInt(video.statistics.dislikeCount);
						aggrByRecordedIn.aggregate[country].favoriteCount = parseInt(video.statistics.favoriteCount);
						aggrByRecordedIn.aggregate[country].commentCount = parseInt(video.statistics.commentCount);
						aggrByRecordedIn.aggregate[country].videoIds = [];
						aggrByRecordedIn.aggregate[country].videoIds.push(video.id);
					}
				}
				else console.log("No country provided on 'RecordedIn:', or no colon . VideoId: " + video.id );
			}
			//// end RecordedIn
			
			//start Genre
			//check if video has  one or many musical genre tag, if yes, add it to aggregate
			else if(genres.includes(tag.toLowerCase())) {
					GenreFound = true;
					var t = tag.toLowerCase();
				
					if(aggrByGenre.aggregate.hasOwnProperty(t)){
						//aggregate already exists, thus increment it
						
						aggrByGenre.aggregate[t].videoCount += 1;
						aggrByGenre.aggregate[t].viewCount += parseInt(video.statistics.viewCount);
						aggrByGenre.aggregate[t].likeCount += parseInt(video.statistics.likeCount);
						aggrByGenre.aggregate[t].dislikeCount += parseInt(video.statistics.dislikeCount);
						aggrByGenre.aggregate[t].favoriteCount += parseInt(video.statistics.favoriteCount);
						aggrByGenre.aggregate[t].commentCount += parseInt(video.statistics.commentCount);
						aggrByGenre.aggregate[t].videoIds.push(video.id);
					}
					else{
						//aggregate is being added for first time, thus initialize it
						aggrByGenre.aggregate[t] = {};
						aggrByGenre.aggregate[t].videoCount = 1;
						aggrByGenre.aggregate[t].viewCount = parseInt(video.statistics.viewCount);
						aggrByGenre.aggregate[t].likeCount = parseInt(video.statistics.likeCount);
						aggrByGenre.aggregate[t].dislikeCount = parseInt(video.statistics.dislikeCount);
						aggrByGenre.aggregate[t].favoriteCount = parseInt(video.statistics.favoriteCount);
						aggrByGenre.aggregate[t].commentCount = parseInt(video.statistics.commentCount);
						aggrByGenre.aggregate[t].videoIds = [];
						aggrByGenre.aggregate[t].videoIds.push(video.id);
					}
				
			}
			//// end Genre

			//check if some or all required tags not found, if so, store that video link for manual correction
			if((!ArtistsFromFound || !RecordedInFound || !GenreFound) && tagIndex == lastTagIndex)
					notTaggedYet.push(video.id);

			tagIndex++;		
			});
		}
		else {
		//no tags at all
		notTaggedYet.push(video.id);
		}
	});
	
}

module.exports.aggregate = aggregate;

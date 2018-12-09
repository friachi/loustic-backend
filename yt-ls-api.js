//main.js
//npm install googleapis

const {google} = require('googleapis');
const fs = require('fs');
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
var notTaggedYet = [];


/////////////////////////////////////
/////// Main Functions ////////
/////////////////////////////////////

async function aggregate() {

//reset vars
nextPageToken = undefined;
prevPageToken = undefined;
videosDetails = {};
videosDetails.results = [];
aggrByArtistsFrom = {};
aggrByRecordedIn = {};
notTaggedYet = [];

console.log("Requesting all uploaded videos on Loustic Sessions...");

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

//aggregate videos count. It generates 2 objects: aggrByArtistsFrom & aggrByRecordedIn with the below structure:
//{ country : { videoCount,viewCount,likeCount,dislikeCount,favoriteCount,commentCount,videoIds:[strings]} }
console.log('Data received.');

console.log('Aggregating data based on tags...');
aggregateVideosPerCountry();
console.log('Aggregation done');

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
        fields: 'items(id,statistics,snippet(title,description,tags,publishedAt,thumbnails(standard)))'
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
	
	//go through all videos item

	videosDetails.results.forEach(function(video) {
		var tags = video.snippet.tags;
		if(tags){
			var ArtistsFromFound = false;
			var RecordedInFound = false;
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
					if(aggrByArtistsFrom.hasOwnProperty(country)){
						//aggregate already exists, thus increment it
						
						aggrByArtistsFrom[country].videoCount += 1;
						aggrByArtistsFrom[country].viewCount += parseInt(video.statistics.viewCount);
						aggrByArtistsFrom[country].likeCount += parseInt(video.statistics.likeCount);
						aggrByArtistsFrom[country].dislikeCount += parseInt(video.statistics.dislikeCount);
						aggrByArtistsFrom[country].favoriteCount += parseInt(video.statistics.favoriteCount);
						aggrByArtistsFrom[country].commentCount += parseInt(video.statistics.commentCount);
						aggrByArtistsFrom[country].videoIds.push(video.id);
					}
					else{
						//aggregate is being added for first time, thus initialize it
						aggrByArtistsFrom[country] = {};
						aggrByArtistsFrom[country].videoCount = 1;
						aggrByArtistsFrom[country].viewCount = parseInt(video.statistics.viewCount);
						aggrByArtistsFrom[country].likeCount = parseInt(video.statistics.likeCount);
						aggrByArtistsFrom[country].dislikeCount = parseInt(video.statistics.dislikeCount);
						aggrByArtistsFrom[country].favoriteCount = parseInt(video.statistics.favoriteCount);
						aggrByArtistsFrom[country].commentCount = parseInt(video.statistics.commentCount);
						aggrByArtistsFrom[country].videoIds = [];
						aggrByArtistsFrom[country].videoIds.push(video.id);
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
					if(aggrByRecordedIn.hasOwnProperty(country)){
						//aggregate already exists, thus increment it
						
						aggrByRecordedIn[country].videoCount += 1;
						aggrByRecordedIn[country].viewCount += parseInt(video.statistics.viewCount);
						aggrByRecordedIn[country].likeCount += parseInt(video.statistics.likeCount);
						aggrByRecordedIn[country].dislikeCount += parseInt(video.statistics.dislikeCount);
						aggrByRecordedIn[country].favoriteCount += parseInt(video.statistics.favoriteCount);
						aggrByRecordedIn[country].commentCount += parseInt(video.statistics.commentCount);
						aggrByRecordedIn[country].videoIds.push(video.id);
					}
					else{
						//aggregate is being added for first time, thus initialize it
						aggrByRecordedIn[country] = {};
						aggrByRecordedIn[country].videoCount = 1;
						aggrByRecordedIn[country].viewCount = parseInt(video.statistics.viewCount);
						aggrByRecordedIn[country].likeCount = parseInt(video.statistics.likeCount);
						aggrByRecordedIn[country].dislikeCount = parseInt(video.statistics.dislikeCount);
						aggrByRecordedIn[country].favoriteCount = parseInt(video.statistics.favoriteCount);
						aggrByRecordedIn[country].commentCount = parseInt(video.statistics.commentCount);
						aggrByRecordedIn[country].videoIds = [];
						aggrByRecordedIn[country].videoIds.push(video.id);
					}
				}
				else console.log("No country provided on 'RecordedIn:', or no colon . VideoId: " + video.id );
			}
			//// end RecordedIn
			
			//check if some or all required tags not found, if so, store that video link for manual correction
			if((!ArtistsFromFound || !RecordedInFound) && tagIndex == lastTagIndex)
					notTaggedYet.push(video.id);

			tagIndex++;		
			});
		}
		else {
		//no tags at all
		notTaggedYet.push(video.id);
		}
	});

	//Write Data to files
	var json;

	//aggrByArtistsFrom.json
	console.log("Videos Aggregated by 'ArtistsFrom:' tag stored in aggrByArtistsFrom.json");
	json = JSON.stringify(aggrByArtistsFrom);
	fs.writeFile('aggrByArtistsFrom.json', json, 'utf8', function (err) {
	    if (err) {
	        return console.log(err);
	    }
	});
	
	//aggrByRecordedIn.json
	console.log("Videos Aggregated by 'RecordedIn:' tag stored in aggrByRecordedIn.json");
	json = JSON.stringify(aggrByRecordedIn);
	fs.writeFile('aggrByRecordedIn.json', json, 'utf8', function (err) {
	    if (err) {
	        return console.log(err);
	    }
	});
	
	//notTaggedYet.json
	console.log("Videos having missing or none of the required tags ae stored in notTaggedYet.json");
	json = JSON.stringify(notTaggedYet);
	fs.writeFile('notTaggedYet.json', json, 'utf8', function (err) {
	    if (err) {
	        return console.log(err);
	    }
	});
	
}

module.exports.aggregate = aggregate;

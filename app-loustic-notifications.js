const pubSubHubbub = require("pubsubhubbub");
const axios = require('axios')


const refreshData = async () => {
  try {
    console.log('refreshing data...')
    return await axios.post('https://loustic.tk/api/refresh-data')
  } catch (error) {
    console.error('Error while refreshing data');
    console.error(error)
  }
}

    
var pubsub = pubSubHubbub.createServer({
        callbackUrl: "https://loustic.tk/notifications"
        //secret: "change me!"
    });
    
    topic = "https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCHziILhb2V5ahNIMSmaOAbQ";
    hub = "http://pubsubhubbub.appspot.com/";

pubsub.listen(9090);

pubsub.on("denied", function(data){
    console.log("Denied");
    console.log(data);
});

pubsub.on("subscribe", function(data){
    console.log("Subscribe");
    console.log(data);

    console.log("Subscribed "+topic+" to "+hub);
});

pubsub.on("unsubscribe", function(data){
    console.log("Unsubscribe");
    console.log(data);

    console.log("Unsubscribed "+topic+" from "+hub);
});

pubsub.on("error", function(error){
    console.log("Error");
    console.log(error);
});

pubsub.on("feed", function(data){
    //console.log(data)
    console.log("Just got a notfication from Youtube!")
    console.log(data.feed.toString());
    refreshData();

    //pubsub.unsubscribe(topic, hub);
});

pubsub.on("listen", function(){
    console.log("Listening for Youtube notifications on port %s", pubsub.port);
    pubsub.subscribe(topic, hub);
});
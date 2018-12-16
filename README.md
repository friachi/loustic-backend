# loustic-backend
A set of backend services for Loustic Sessions applications

## API

Locally running on 8080

### Refresh data

The data exposed by the API is aggregated by a background process running on the server, to trigger this process and thus refresh the data:  

**POST** https://loustic.tk/api/refresh-data
```json
{
    "code": "200",
    "message": "All data has been refreshed",
    "url": [
        "/api/aggregates",
        "/api/videos"
    ]
}
```

NOTE: this action is performed automatically any time a youtube video on Loustic Sessions channel gets uploaded or updated (title or description)
Check section 'Notifications' for more info

### Resource: videos

1. Get all loustic sessions videos details  
**GET** https://loustic.tk/api/videos

```json
{  
   datetime:"2018-12-13T22:00:57+01:00",
   results:[  
      {  
         id:"roQb5HIQXB8",
         snippet:{  
            publishedAt:"2018-11-29T13:49:06.000Z",
            title:"Charlotte Grace | Wiseman | Loustic Sessions",
            description:"Charlotte Grace playing "            Wiseman" live for Loustic Sessions Shot in Paris,
            April 9,
            2018            Subscribe to the channel:            http:            //bit.ly/2FWcNhr Vocals:            Charlotte Wacker Guitar:            Keni Arifi Cajón:            Lukas Knoepfel Images:            Julien Nehring Sound:            Fahed Al Riachi Produced by:            Julien Nehring Photos by Yosri Harzallah:            https:            //goo.gl/SW7ih2 Special thanks to:            Mon coeur Belleville https:            //www.facebook.com/lousticsessions https:            //www.facebook.com/charlottegraceofficialmusic http://lnk.site/charlottegracebirth",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/roQb5HIQXB8/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "Live",
               "Recording",
               "Sessions",
               "ArtistsFrom:CHE",
               "RecordedIn:FRA",
               "Year:2018"
            ]
         },
         statistics:{  
            viewCount:"255",
            likeCount:"16",
            dislikeCount:"0",
            favoriteCount:"0",
            commentCount:"0"
         }
      },
      {  
         id:"roQb5HIQXB8",
         ....,
      }
   ]
 }   
      

```

2. Get one video details by videoId  
**GET** https://loustic.tk/api/videos/roQb5HIQXB8



### Resource: aggregates

1. Run youtube channel aggregation:   
**POST** https://loustic.tk/api/aggregates

```json
{
    "code": "200",
    "message": "All aggregates have been updated",
    "url": "/api/aggregates"
}
```

1. List all aggregates:  
**GET** https://loustic.tk/api/aggregates

```json
{  
   aggregates:[  
      {  
         id:"by-artists-roots",
         description:"Aggregate of Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code",
         url:"/api/aggregates/by-artists-roots"
      },
      {  
         id:"by-recorded-in",
         description:"Aggregate of Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code",
         url:"/api/aggregates/by-recorded-in"
      },
      {  
         id:"by-genre",
         description:"Aggregate of Loustic Sessions videos based on musical genres",
         url:"/api/aggregates/by-genre"
      },
      {  
         id:"not-tagged-yet",
         description:"Retuns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation",
         url:"/api/aggregates/not-tagged-yet"
      }
   ]
}
```

2. Get a single aggregate by id:  
**GET** https://loustic.tk/api/aggregates/by-artists-roots

```json
{  
   aggregateId:"by-artists-roots",
   datetime:"2018-12-12T16:44:18+00:00",
   aggregate:{  
      CHE:{  
         videoCount:4,
         viewCount:2039,
         likeCount:78,
         dislikeCount:0,
         favoriteCount:0,
         commentCount:12,
         videoIds:[  
            "roQb5HIQXB8",
            "VNvcaVvCCko",
            "eaRgvOMSw7A",
            "ieh1xlwskF4"
         ]
      },
      MDG:{  
         videoCount:1,
         viewCount:2967,
         likeCount:157,
         dislikeCount:1,
         favoriteCount:0,
         commentCount:18,
         videoIds:[  
            "8bz6khgCZ30"
         ]
      },
      DNK:{  
         videoCount:1,
         viewCount:294,
         likeCount:16,
         dislikeCount:0,
         favoriteCount:0,
         commentCount:0,
         videoIds:[  
            "dPAr2d8etCg"
         ]
      },
   ...
   }
}
```

3. Get a single aggregate by id, then filter on one item:  
**GET** https://loustic.tk/api/aggregates/by-genre/jazz

```json
{  
   aggregateId:"by-genre",
   datetime:"2018-12-12T23:23:24+00:00",
   jazz:{  
      videoCount:11,
      viewCount:11372,
      likeCount:174,
      dislikeCount:3,
      favoriteCount:0,
      commentCount:12,
      videoIds:[  
         "SoGZBAV5pG8",
         "qA9wmcleksQ",
         "NSu-xye0Geg",
         "_sYiJGpTQyI",
         "tL0Nu8Bkabk",
         "hrJR8ciqz6k",
         "fMK1sgi93cM",
         "cEfRZOSbU-o",
         "AYhz8AacHd0",
         "e3047uabiRo",
         "swUtB5oMxlk"
      ]
   }
}
```

## Notifications

Locally running on 9090

This is a background process that auto-refresh data, implemented using a pubsubhubbub client listening on port 9090, subscribed to Loustic Sessions channel Youtube notifications (atom feeds). when notification are received from youtube, it sends a POST /api/refresh-data, thus refreshing and aggregating all data to be exposed by the API
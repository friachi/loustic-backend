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

3. Search videos

It is possible to search videos by 'title','description' and/or 'tags', depending on how you form you search query  

3.1 Search all fields  

**GET** https://loustic.tk/api/videos/search=campus

```json
{  
   totalFound:1,
   searchCriteria:{  
      search:"campus"
   },
   searchableFields:[  
      "title",
      "description",
      "tags"
   ],
   results:[  
      {  
         id:"_YKBXhLSttU",
         snippet:{  
            publishedAt:"2018-09-17T17:43:00.000Z",
            title:"DenDana | Dawi | Loustic Sessions",
            description:"DenDana playing "            Dawi" live for Loustic Sessions Shot in Paris,
            June 16,
            2018            Subscribe to the channel:            http://bit.ly/2FWcNhr Vocals,
            guitar:            Nassim Dendane Guitar:            Pierre Danel Images:            Julien Nehring Sound:            Fahed Al Riachi In collaboration with:            Onorient Shot at Institut du Monde Arabe https:            //www.facebook.com/lousticsessions https://www.facebook.com/dendanaofficiel",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/_YKBXhLSttU/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "Live",
               "Recording",
               "paris",
               "ima",
               "institut",
               "monde arabe",
               "acoustic",
               "guitar",
               "onorient",
               "rooftop",
               "view",
               "radio",
               "campus",
               "ArtistsFrom:MAR",
               "RecordedIn:FRA"
            ]
         },
         statistics:{  
            viewCount:"601",
            likeCount:"30",
            dislikeCount:"1",
            favoriteCount:"0",
            commentCount:"2"
         }
      }
   ]
}
```

3.2 Search only in one field  

**GET**  https://loustic.tk/api/videos/search=cover&fields=title

```json
{  
   totalFound:3,
   searchCriteria:{  
      search:"cover",
      fields:"title"
   },
   searchableFields:[  
      "title",
      "description",
      "tags"
   ],
   results:[  
      {  
         id:"TqRwwjoxDKU",
         snippet:{  
            publishedAt:"2016-10-09T14:44:11.000Z",
            title:"Karen LANO | Grace (J. Buckley cover) | Loustic Sessions",
            description:"Karen LANO playing "            Grace" (J. Buckley cover) live for Loustic Sessions Shot in Paris,
            September 17,
            2016            Subscribe to the channel:            http:            //bit.ly/2FWcNhr Vocals:            Karen LANO Guitar/Backing vocals:            Olivier LeGall Sound & Mix:            Fahed Images & Edit:            Julien https:            //www.facebook.com/lousticsessions/ https:            //www.facebook.com/karen.lano.7/ https://www.facebook.com/olivierlegallmusic/",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/TqRwwjoxDKU/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "ArtistsFrom:FRA",
               "RecordedIn:FRA"
            ]
         },
         statistics:{  
            viewCount:"1403",
            likeCount:"11",
            dislikeCount:"0",
            favoriteCount:"0",
            commentCount:"4"
         }
      },
      {  
         id:"uR3X4bEu9Ew",
         snippet:{  
            publishedAt:"2016-09-16T14:05:54.000Z",
            title:"Imen Khayati, Hosny Hamdi & Wael Abdennadher | Summertime (cover) | Loustic Sessions",
            description:"Imen Khayati, Hosny Hamdi & Wael Abdennadher playing "            Summertime" (cover) live for Loustic Sessions Shot at Hotel Dar Said,
            Sidi Bou Said,
            September 3,
            2016            Subscribe to the channel:            http:            //bit.ly/2FWcNhr Vocals:            Imen Khayati - ايمان خياطي Guitar:            Hosny Hamdi - حسني حمدي Percussion:            Wael Abdennadher - وائل عبد الناظر Images & Edit:            Julien Mix:Fahed Recorded at Hotel Dar Said",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/uR3X4bEu9Ew/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "Imen",
               "ArtistsFrom:TUN",
               "RecordedIn:TUN"
            ]
         },
         statistics:{  
            viewCount:"2743",
            likeCount:"45",
            dislikeCount:"0",
            favoriteCount:"0",
            commentCount:"1"
         }
      },
      ...
   ]
}
```

3.3 Search only in the specified list of fields  

**GET**  https://loustic.tk/api/videos/search=%20oud&fields=description,tags

```json
{  
   totalFound:2,
   searchCriteria:{  
      search:" oud",
      fields:"description,tags"
   },
   searchableFields:[  
      "title",
      "description",
      "tags"
   ],
   results:[  
      {  
         id:"cc_XDfWFTA4",
         snippet:{  
            publishedAt:"2016-10-24T10:28:04.000Z",
            title:"Tamer Abu Ghazaleh | Helm | Loustic Sessions",
            description:"Tamer Abu Ghazaleh playing "            Helm" live for Loustic Sessions Shot in Paris,
            October 5,
            2016            Subscribe to the channel:            http:            //bit.ly/2FWcNhr Vocals / Oud:            Tamer Abu Ghazaleh Drums:            Khaled Yassine Bass:            Mahmoud Waly Keyboards:            Shadi El-Hosseiny Sound & Mix:            Fahed Al Riachi Images & Edit:            Julien Nehring https:            //www.facebook.com/lousticsessions/ https://www.facebook.com/tagmusic/ ---- Helm            [  
               Dream
            ]            Extract from a poem by Naguir Sorour Translated by Nariman Youssef Oh Mama I had a dream A strange and frightening dream I saw myself in a boat Sailing,
            mama,
            in a wide sea A harvest field with calm waves No shore in sight In the dream I was rowing My cousin,
            the boatman at the helm Wrapped in a scarf His scarf was so red,
            mama The colour of tomatoes Then a white dove White as a wad of cotton Landed on his head No sooner had land appeared Than wind like a rabid monster Began to howl The boat capsized and left me Screaming in the waves Oh cousin,
            oh cousin Oh cousin As he walked Laughing above the waves He went so far,
            mama And on his head the dove Still stood",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/cc_XDfWFTA4/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "ArtistsFrom:PSE",
               "RecordedIn:FRA"
            ]
         },
         statistics:{  
            viewCount:"7000",
            likeCount:"118",
            dislikeCount:"1",
            favoriteCount:"0",
            commentCount:"2"
         }
      },
      {  
         id:"b3GV6hmBqho",
         snippet:{  
            publishedAt:"2016-10-25T10:34:13.000Z",
            title:"Tamer Abu Ghazaleh | Ghareeb | Loustic Sessions",
            description:"Tamer Abu Ghazaleh playing "            Ghareeb" live for Loustic Sessions Shot in Paris,
            October 5,
            2016            Vocals / Oud:            Tamer Abu Ghazaleh Drums:            Khaled Yassine Bass:            Mahmoud Waly Keyboards:            Shadi El-Hosseiny Sound & Mix:            Fahed Al Riachi Images & Edit:            Julien Nehring https:            //www.facebook.com/lousticsessions/ https://www.facebook.com/tagmusic/ ---- El Ghareeb            [  
               The Stranger
            ]            Poem by Ramez Farag Translated by Nariman Youssef The stranger,
            when he spoke of his trees His body would leave The blood in his veins Would blend desert gourd With the cooing of doves His hands would grow branches The colour of dark longing With leaves that lower their shade Over the houses His hair would grow Nine metres long Draping over the sand Carpets of fluttering silk The stranger,
            now that silence has claimed him And he no longer speaks of trees His body will scream And rise above the graves From afar a wind will come Carrying voices Of horses Wailing",
            thumbnails:{  
               standard:{  
                  url:"https://i.ytimg.com/vi/b3GV6hmBqho/sddefault.jpg",
                  width:640,
                  height:480
               }
            },
            tags:[  
               "ArtistsFrom:PSE",
               "RecordedIn:FRA"
            ]
         },
         statistics:{  
            viewCount:"1180",
            likeCount:"22",
            dislikeCount:"3",
            favoriteCount:"0",
            commentCount:"2"
         }
      }
   ]
}
```


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
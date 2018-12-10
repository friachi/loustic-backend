# loustic-backend
An app (node.js) that provides backend services for Loustic sessions

## Implemented

1. Run youtube channel aggregation: 
*PUT* http://localhost:8080/loustic-backend/aggregates

```json
{
    "code": "200",
    "message": "All aggregates have been updated",
    "url": "/loustic-backend/aggregates"
}
```

2. List all aggregates
*GET* http://localhost:8080/loustic-backend/aggregates

```json
{
    "aggregates": [
        {
            "id": "by-artists-roots",
            "description": "Aggregate Loustic Sessions videos based on where artists come from. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code",
            "url": "/loustic-backend/aggregates/by-artists-roots"
        },
        {
            "id": "by-recorded-in",
            "description": "Aggregate Loustic Sessions videos based on where the sessions were recorded. Returns json object with aggregate keys based on ISO 3166-1 Alpha-3 code",
            "url": "/loustic-backend/aggregates/by-recorded-in"
        },
        {
            "id": "not-tagged-yet",
            "description": "Retruns an array of Loustic sessions videoIds that are not properly tagged yet, thus excluded from aggregation",
            "url": "/loustic-backend/aggregates/not-tagged-yet"
        }
    ]
}
```

3. Get a single aggregate by id
*GET* http://localhost:8080/loustic-backend/aggregates/by-artists-roots

```json
{
    "CHE": {
        "videoCount": 4,
        "viewCount": 2011,
        "likeCount": 76,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 12,
        "videoIds": [
            "roQb5HIQXB8",
            "VNvcaVvCCko",
            "eaRgvOMSw7A",
            "ieh1xlwskF4"
        ]
    },
    "MDG": {
        "videoCount": 1,
        "viewCount": 2786,
        "likeCount": 151,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 18,
        "videoIds": [
            "8bz6khgCZ30"
        ]
    },
    "DNK": {
        "videoCount": 1,
        "viewCount": 285,
        "likeCount": 15,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 0,
        "videoIds": [
            "dPAr2d8etCg"
        ]
    },
    "FRA": {
        "videoCount": 34,
        "viewCount": 47457,
        "likeCount": 1260,
        "dislikeCount": 25,
        "favoriteCount": 0,
        "commentCount": 128,
        "videoIds": [
            "h32WUbMUvfk",
            "pvcllZlIsbs",
            "2VduhWEim90",
            "XvABVgscDlU",
            "ecA3qhpEH04",
            "lql3zXHT7GA",
            "-kikgWp4hvo",
            "7eQuUos0fDk",
            "0fVVnwv7SO4",
            "96UwZl51yP0",
            "qHpE-KYeLEA",
            "GnZJblRZXF0",
            "YvWIKloK7l4",
            "ikY_JAUsRdY",
            "LZ2bTGgJMfg",
            "uYv85Q5QSPI",
            "8VTCvezghX0",
            "5YmkKyWFXfY",
            "-yHLajfyK_0",
            "s0uiXxHLBew",
            "-PejeN1XhuA",
            "wVwKL1n_nGM",
            "ps08vkW7x6c",
            "DoGvSNvIv5E",
            "UeJrqO7ZBt4",
            "8llN2_QEqIE",
            "GJuy3gBxQhw",
            "-BiQiQQmHos",
            "FxnnGKmlr5w",
            "6gzzecHLEsM",
            "NCbYpCS8O-E",
            "TqRwwjoxDKU",
            "Ef-3rosi0zo",
            "SUmyAiV-O5g"
        ]
    },
    "MAR": {
        "videoCount": 3,
        "viewCount": 386679,
        "likeCount": 6676,
        "dislikeCount": 125,
        "favoriteCount": 0,
        "commentCount": 253,
        "videoIds": [
            "_YKBXhLSttU",
            "HZC7d3E3hlU",
            "rsTOMQoRY4I"
        ]
    },
    "USA": {
        "videoCount": 12,
        "viewCount": 9012,
        "likeCount": 222,
        "dislikeCount": 2,
        "favoriteCount": 0,
        "commentCount": 17,
        "videoIds": [
            "uK1K2_DskNA",
            "1HUgz4xXpTo",
            "2ir3hffNT44",
            "0Tg9uzjekGQ",
            "1mKlQFHbld0",
            "fJRjJi0wFDA",
            "ZOFcXbvzIw0",
            "5dajSkwrkYo",
            "tL0Nu8Bkabk",
            "hrJR8ciqz6k",
            "fMK1sgi93cM",
            "cEfRZOSbU-o"
        ]
    },
    "CPV": {
        "videoCount": 2,
        "viewCount": 949,
        "likeCount": 29,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 2,
        "videoIds": [
            "SkNTJNxM31w",
            "ma6tXqDnIlw"
        ]
    },
    "TUN": {
        "videoCount": 6,
        "viewCount": 146920,
        "likeCount": 1908,
        "dislikeCount": 43,
        "favoriteCount": 0,
        "commentCount": 90,
        "videoIds": [
            "ZLWUQuMq-Nc",
            "HTztz0rvHoQ",
            "uR3X4bEu9Ew",
            "bJJ8K08oBNI",
            "9dxTICqAJRI",
            "nZzv5L01FZM"
        ]
    },
    "GBR": {
        "videoCount": 4,
        "viewCount": 4531,
        "likeCount": 135,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 19,
        "videoIds": [
            "PIj53AG4pYI",
            "dBEBALeVcN4",
            "MwgR9F5LVpY",
            "CShLREGxsAU"
        ]
    },
    "SWE": {
        "videoCount": 31,
        "viewCount": 13109,
        "likeCount": 184,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 17,
        "videoIds": [
            "7e-ar-a9wjQ",
            "nK1SDOvBNp8",
            "SoGZBAV5pG8",
            "qA9wmcleksQ",
            "oUzQbDRydTk",
            "Ktmn7_BXy-Y",
            "hAor3jNhuUg",
            "FrqkxpBLcik",
            "Icz3UnnsB1U",
            "olrGuuHxm_Q",
            "EhIar0FlN6Y",
            "GtG-G-JljpA",
            "bH0yxkLYjWY",
            "p-A1kQd-5oA",
            "VK-kMd-DHYg",
            "KgV9DaZh_74",
            "yyeSFuuZS1Y",
            "X-eD9P-ufFU",
            "EDf0vslQCu0",
            "7BNe-3ZOO14",
            "cmiBKs4BDIQ",
            "1hfOSylEDsQ",
            "4Wnv_UsD4uE",
            "zMw-Er5ew1U",
            "OxWyjSeoEDI",
            "rt4q4QtsZvQ",
            "BKxB3Qgt4r0",
            "wFvbM9sT_Fw",
            "v9lxuHtwUOc",
            "cDmus_J6sM4",
            "fywDulLk6Yo"
        ]
    },
    "CHN": {
        "videoCount": 2,
        "viewCount": 1386,
        "likeCount": 75,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 7,
        "videoIds": [
            "fQ1vE0B5ioE",
            "NCjsrgK1kq4"
        ]
    },
    "CMR": {
        "videoCount": 4,
        "viewCount": 2089,
        "likeCount": 63,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 2,
        "videoIds": [
            "P87tRcdzaKc",
            "YDwwf1dRTeg",
            "f_TnsfiCIIs",
            "HN2GIMgfNQY"
        ]
    },
    "ITA": {
        "videoCount": 2,
        "viewCount": 4711,
        "likeCount": 79,
        "dislikeCount": 4,
        "favoriteCount": 0,
        "commentCount": 10,
        "videoIds": [
            "RzWLYB8EmM8",
            "h63LVIv6U_A"
        ]
    },
    "CAN": {
        "videoCount": 4,
        "viewCount": 3656,
        "likeCount": 93,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 8,
        "videoIds": [
            "BEReGPDOOjg",
            "Lo23r_nhJsE",
            "VeMer64JvT4",
            "p-lwKiQIXHI"
        ]
    },
    "MLI": {
        "videoCount": 4,
        "viewCount": 9387,
        "likeCount": 169,
        "dislikeCount": 5,
        "favoriteCount": 0,
        "commentCount": 14,
        "videoIds": [
            "T4HWtpTuGMI",
            "2AlCv-k1YyQ",
            "74-q-9TaYAQ",
            "OWpt-n07Vfo"
        ]
    },
    "DZA": {
        "videoCount": 1,
        "viewCount": 21269,
        "likeCount": 278,
        "dislikeCount": 11,
        "favoriteCount": 0,
        "commentCount": 19,
        "videoIds": [
            "kNF0owGYG2g"
        ]
    },
    "SDN": {
        "videoCount": 2,
        "viewCount": 2457,
        "likeCount": 56,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 6,
        "videoIds": [
            "eirNg1dMtPg",
            "DqWs1oLm3es"
        ]
    },
    "SYR": {
        "videoCount": 2,
        "viewCount": 13172,
        "likeCount": 248,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 17,
        "videoIds": [
            "MS6ndwcGjdA",
            "i8fGPIOXf-A"
        ]
    },
    "LBN": {
        "videoCount": 6,
        "viewCount": 16284,
        "likeCount": 277,
        "dislikeCount": 7,
        "favoriteCount": 0,
        "commentCount": 18,
        "videoIds": [
            "NSu-xye0Geg",
            "_sYiJGpTQyI",
            "Pqy-uxL-KxA",
            "dh786ZrENtY",
            "uE-sj3Ta6eE",
            "YHXvBUenmrs"
        ]
    },
    "EGY": {
        "videoCount": 3,
        "viewCount": 377308,
        "likeCount": 4371,
        "dislikeCount": 123,
        "favoriteCount": 0,
        "commentCount": 193,
        "videoIds": [
            "zpf_R4TU8YY",
            "ja_HgVeIKpw",
            "3pjZNxpT6g8"
        ]
    },
    "ARG": {
        "videoCount": 2,
        "viewCount": 1630,
        "likeCount": 33,
        "dislikeCount": 1,
        "favoriteCount": 0,
        "commentCount": 8,
        "videoIds": [
            "XbUMNRmtKRk",
            "1UX7aiPovv8"
        ]
    },
    "DEU": {
        "videoCount": 1,
        "viewCount": 624,
        "likeCount": 7,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 0,
        "videoIds": [
            "n47CeAR6x5Y"
        ]
    },
    "PSE": {
        "videoCount": 2,
        "viewCount": 8159,
        "likeCount": 139,
        "dislikeCount": 4,
        "favoriteCount": 0,
        "commentCount": 4,
        "videoIds": [
            "cc_XDfWFTA4",
            "b3GV6hmBqho"
        ]
    },
    "JAM": {
        "videoCount": 3,
        "viewCount": 4907,
        "likeCount": 62,
        "dislikeCount": 2,
        "favoriteCount": 0,
        "commentCount": 1,
        "videoIds": [
            "AYhz8AacHd0",
            "e3047uabiRo",
            "swUtB5oMxlk"
        ]
    },
    "NLD": {
        "videoCount": 6,
        "viewCount": 9504,
        "likeCount": 131,
        "dislikeCount": 0,
        "favoriteCount": 0,
        "commentCount": 5,
        "videoIds": [
            "loCL3ENNPG8",
            "kgM7kvE3zpA",
            "Id8LnaK6nCc",
            "MxDTth-IyG4",
            "xDp73ZWctgM",
            "qpubNYZ1HQY"
        ]
    },
    "CHL": {
        "videoCount": 4,
        "viewCount": 5363,
        "likeCount": 26,
        "dislikeCount": 6,
        "favoriteCount": 0,
        "commentCount": 0,
        "videoIds": [
            "y13k1uliWrE",
            "uar85mkCgtQ",
            "vTZnipEtV4M",
            "ZAX73WREWH4"
        ]
    }
}
```



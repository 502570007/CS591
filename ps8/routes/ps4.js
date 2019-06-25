const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');
const config = require('../config/config');

const yelp = require('yelp-fusion');
const client = yelp.client(config.yelp.apiKey);

const db = require('../config/mongo')

db.connect((err, client) => {
    if (err) {
        console.log(`ERR: ${err}`);
    } else {
        console.log(`Connected`);
    }
});

//for PS8.1 PS8.2
router.route('/boston/yelp/business')
    .get(function (req, res, next) {
        let key = req.query.key;
        if (key == null) {
            res.send("key is null");
            return;
        }

        let collection = db.getDB().collection('business');
        collection.find({"key": key}).toArray(function (err, docs) {
            if (docs.length > 0) {
                // get data from cache
                docs[0]['fromCache'] = true;
                res.send(docs[0]);
            } else {
                const searchRequest = {
                    term: key,
                    location: 'Boston'
                };
                client.search(searchRequest).then(response => {
                    let collection = db.getDB().collection('business');
                    let wrapperBusiness = {
                        'key': key,
                        'business': response.jsonBody.businesses
                    };
                    collection.insertOne(wrapperBusiness, function (err, r) {
                        wrapperBusiness['fromCache'] = false;
                        res.send(wrapperBusiness);
                    });
                }).catch(e => {
                    console.log(e);
                });
            }
        });
    });

//for PS8.3
router.route('/')
    .get(function (req, res, next) {
        let type = req.headers["content-type"];
        if (type === "application/json") {
            console.log("Starting waterfall");

            // two api call
            async.waterfall([getCityWeather, getYelpEvent],
                (err, result, weather) => {
                    if (err) {
                        res.send({"error": err});
                    } else {
                        res.send({condition: weather.wx_desc, result: result});
                    }
                });
        } else {
            getCityWeather((err, weather) => res.render('ps4', weather));
        }
    });

const getCityWeather = function (cb) {
    return new Promise(function (resolve, reject) {
        let collection = db.getDB().collection('weather');

        //Boston MA
        let key = '02215';
        collection.find({'key': key}).toArray(function (err, docs) {
            if (docs.length > 0) {
                cb(null, docs[0]);
            } else {
                let options = {
                    method: 'GET',
                    url: config.weather.url + key,
                    qs: config.weather.qs
                };

                request(options, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        throw new Error(error);
                    }
                    collection = db.getDB().collection('weather');
                    let wrapperWeather = JSON.parse(body);
                    wrapperWeather['key'] = key;
                    collection.insertOne(wrapperWeather, function (err, r) {
                        cb(null, wrapperWeather);
                    });
                });
            }
        });
    })
};


const getYelpEvent = function (weather, cb) {
    const searchRequest = {
        term: weather.wx_desc,
        location: 'Boston'
    };

    client.search(searchRequest).then(response => {

    }).catch(e => {
        console.log(e);
    });

    let key = weather.wx_desc;

    let collection = db.getDB().collection('business');
    collection.find({"key": key}).toArray(function (err, docs) {
        if (docs.length > 0) {
            // get data from cache
            docs[0]['fromCache'] = true;
            cb(null, docs[0], weather);
        } else {
            const searchRequest = {
                term: key,
                location: 'Boston'
            };
            client.search(searchRequest).then(response => {
                let collection = db.getDB().collection('business');
                let wrapperBusiness = {
                    'key': key,
                    'business': response.jsonBody.businesses
                };
                collection.insertOne(wrapperBusiness, function (err, r) {
                    wrapperBusiness['fromCache'] = false;
                    cb(null, wrapperBusiness, weather);
                });
            }).catch(e => {
                console.log(e);
            });
        }
    });
};

module.exports = router;

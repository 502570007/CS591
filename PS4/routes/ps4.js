const express = require('express');
const router = express.Router();
let request = require('request');

router
    .get('/', function (req, res, next) {
    let options = {
        method: 'GET',
        url: 'http://api.weatherunlocked.com/api/current/us.02212',
        qs: {
            app_id: '06013a07',
            app_key: 'f2203f9702763c087a248dd863cc3d57'
        }
    };
    request(options, function (error, response, body) {
        if (error)
            throw new Error(error);
        let jsonBody = JSON.parse(body);
        res.render('ps4',  jsonBody);
    });
});


//const yelp = require('yelp-fusion');

// const apiKey = 'TcZVo8uGQKj-7vEYxJGkSzFkcSNpSaC-TYbGFInNG7ONDqJdMnMa2rIMKk6HDVutnnM3HcXdFMM_yaheZNujLpL82oZRWWXoo-QbA8RJdw8b1gW79Q3ZRZ-kvrH4XHYx';
// const client = yelp.client(apiKey);
//
// const searchRequest = {
//     term: 'Rain',
//     location: 'Boston'
// };
//
// router.get('/', function (req, res, next) {
//     client.search(searchRequest).then(response => {
//         const firstResult = response.jsonBody.businesses[0];
//         const prettyJson = JSON.stringify(firstResult, null, 4);
//         res.send(prettyJson);
//         console.log(prettyJson);
//     }).catch(e => {
//         console.log(e);
//     });
// });

// router.post('/', function (req, res, next) {
//   let input = req.body.input;
//   res.render('ps4', {data:JSON.stringify({string:input,length:input.length})});
// });

module.exports = router;

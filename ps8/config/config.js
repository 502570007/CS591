const configs =
    {
        weather: {
            url: 'http://api.weatherunlocked.com/api/current/us.', // the weather of Boston
            qs: {
                app_id: '06013a07',
                app_key: 'f2203f9702763c087a248dd863cc3d57'
            }
        },

        yelp: {
            apiKey: 'TcZVo8uGQKj-7vEYxJGkSzFkcSNpSaC-TYbGFInNG7ONDqJdMnMa2rIMKk6HDVutnnM3HcXdFMM_yaheZNujLpL82oZRWWXoo-QbA8RJdw8b1gW79Q3ZRZ-kvrH4XHYx'
        },

        mongo: {
            url: 'mongodb://localhost:27017/',
        }
    };

module.exports = configs

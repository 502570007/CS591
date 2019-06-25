const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
let instanceDB = null;

function connect(cb) {
  MongoClient.connect(config.mongo.url, { useNewUrlParser: true }, (err, db)=>{
    instanceDB = db.db('cache');
  });
}

function getDB() {
  return instanceDB;
}

module.exports = {
  connect,
  getDB
};



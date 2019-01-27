'use strict';

// functions for communitcating with MongoDB
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to Mongo
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets from Mongo
    getTweets: function(callback) {
      db.collection('tweets').find().toArray(callback);
    }
  };
}

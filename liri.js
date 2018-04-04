require("dotenv").config();
var keys = require("./keys.js");
//var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require('fs-extra');

//Post a Tweet... in Gbash type node liri -Your selected text for the tweet- 
// Hit enter and post the tweet! Dont forget to use your own .env file for keys!

function addTweet() {

  var nodeArgs = process.argv;

  var tweetStatus = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    userInput = tweetStatus + " " + nodeArgs[i];

    tweetStatus = userInput;
  };
  client.post('statuses/update', {
    status: tweetStatus
  }, function (error, tweet, response) {

    console.log(JSON.stringify(tweet.text, null, 2));
    //console.log(JSON.stringify(response, null, 2));
  });

};

//Retrieve Last 20 Tweets, this uses the raw JSON from our tweets, puts them in a loop and filters...
//... out the unwanted data and leaves us with the Tweet Text and Time Posted. 

function seeTweets() {

  client.get('statuses/user_timeline.json?count=20', function (error, tweets, response) {
    if (error) throw error;

    for (i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log(tweets[i].created_at)
    }

    fs.appendFile('')

  });
}


if (process.argv[2] === "seeTweets") {
  seeTweets();
} else if (process.argv[2] === "addTweet") {
  addTweet();
}
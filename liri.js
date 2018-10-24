const fs = require("fs");
const moment = require("moment");
const dotenv = require("dotenv").config();
const Spotify = require("node-spotify-api");
const request = require("request")
const keys = require("./keys.js")


var spotify = new Spotify(keys.spotify);

var artist = "",
    movie = "",
    song = "",
    action = process.argv[2],
    query = process.argv.slice(3).join(" ");



switch (action) {
  case "concert-this":
   concert(query);
    break;
  case "spotify-this-song":
  spotifySearch(query);
    break;
  case "movie-this":
    movies(query);
    break;
  case "do-what-it-says":
    doSomething();
    break;
  default:
    console.log("The commands available are concert-this, spotify-this-song, movie-this and do-what-it-says ")

}


function concert(query) {
  
  

request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp", function(err, response, data){  
  if(data === []){
    console.log("Sorry, we couldn't find that artist.")
  } else{
    // console.log(JSON.parse(data))
  console.log(artist + " is going to be playing in " + JSON.parse(data)[0].venue.name);
  console.log("This venue is located in " + JSON.parse(data)[0].venue.city + ", " +JSON.parse(data)[0].venue.region);
  var unformattedTime =  JSON.parse(data)[0].datetime;
  var time = moment(unformattedTime).format("MMMM Do YYYY, h:mm:ss a");
  console.log("The concert will start on " + time);
  }
})
}


function movies(query){
  movie = process.argv.slice(3).join(" ");
  console.log(query)
  request("http://www.omdbapi.com/?apikey=418b7fe2&t=" + query, function(err, response, data) {

    if (query != "") {     
      
      console.log("The movie's title is: " + JSON.parse(data).Title);
      console.log("The movie was realeased in the year: " + JSON.parse(data).Year);
      console.log("The movie's rating is: " + JSON.parse(data).imdbRating);
      console.log("The movie's Rotten Tomato Score is: " + JSON.parse(data).Ratings[1].Value);
      console.log("The movie was shot in: " + JSON.parse(data).Country);
      console.log("The movie's language is: " + JSON.parse(data).Language);
      console.log("The movie's plot is: " + JSON.parse(data).Plot);
      console.log("The actors in this movie are: " + JSON.parse(data).Actors);
    } else {
      request("http://www.omdbapi.com/?apikey=418b7fe2&t=Mr+Nobody", function (err, response, data) {
      
    if (!err && response.statusCode === 200) {     
      
      console.log("The movie's title is: " + JSON.parse(data).Title);
      console.log("The movie was realeased in the year: " + JSON.parse(data).Year);
      console.log("The movie's rating is: " + JSON.parse(data).imdbRating);
      console.log("The movie's Rotten Tomato Score is: " + JSON.parse(data).Ratings[1].Value);
      console.log("The movie was shot in: " + JSON.parse(data).Country);
      console.log("The movie's language is: " + JSON.parse(data).Language);
      console.log("The movie's plot is: " + JSON.parse(data).Plot);
      console.log("The actors in this movie are: " + JSON.parse(data).Actors);
      console.log("It's on Netflix!");
    }
  });
}
});
}

function spotifySearch (query) {
  if (!query) query = "Por mi reggae muero";

  spotify
  .search({ type: 'track', query: query })
  .then(function(response) {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    console.log(response.tracks.items[0].external_urls.spotify);
    console.log(response.tracks.items[0].album.external_urls.spotify);
  })
  .catch(function(err) {
    console.log(err);
  });

}
  
function doSomething () {
  fs.readFile("random.txt", "utf8", function(error, data) {

    
    if (error) {
      return console.log(error);
    }
  
    var dataArr = data.split(",");
    action = dataArr[0];
    query = dataArr[1];

    switch (action) {
      case "concert-this":
       concert(query);
        break;
      case "spotify-this-song":
      spotifySearch(query);
        break;
      case "movie-this":
        movies(query);
        break;
      case "do-what-it-says":
        doSomething();
        break;
      default:
        console.log("The commands available are concert-this, spotify-this-song, movie-this and do-what-it-says ")
    
    }
  });

}





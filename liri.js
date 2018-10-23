const fs = require("fs");
const inquirer = require("inquirer");
const moment = require("moment");
const dotenv = require("dotenv").config();
const Spotify = require("node-spotify-api");
const request = require("request")
const keys = require("./keys.js")


var spotify = new Spotify(keys.spotify);

var artist = "",
    movie = "",
    song = "",
    action = process.argv[2];



switch (action) {
  case "concert-this":
   concert();
    break;
  case "spotify-this-song":
  spotifySearch();
    break;
  case "movie-this":
    movies();
    break;
  case "do-what-it-says":
    // TODO: Complete this with a function / call to action;
    break;
  default:
    console.log("The commands available are concert-this, spotify-this-song, movie-this and do-what-it-says ")

}


function concert() {
  
  artist = process.argv.slice(3).join(" ");
  console.log(artist)

request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(err, response, data){
  if(data == []){
    console.log("Sorry, we couldn't find that artist.")
  } else{

  console.log(JSON.parse(data)[0].venue.name);
  console.log(JSON.parse(data)[0].venue.city + ", " +JSON.parse(data)[0].venue.region);
  var unformattedTime =  JSON.parse(data)[0].datetime;
  var time = moment(unformattedTime).format("MMMM Do YYYY, h:mm:ss a");
  console.log(time);
  }
})
}


function movies(){
  movie = process.argv.slice(3).join(" ");
  console.log(movie)
  request("http://www.omdbapi.com/?apikey=418b7fe2&t=" + movie, function(err, response, data) {

    if (movie != "") {     
      
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

function spotifySearch () {
  song = process.argv.slice(3).join(" ");

  spotify
  .search({ type: 'track', query: song })
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

}




// inquirer
// .prompt([
//   {
//     type: "list",
//     message: "What do you want to do today?",
//     choices: ["Spotify", "Bands In Town", "OMDB"],
//     name: "command"
//   }


// ])

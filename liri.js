require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

console.log(keys);
var fs = require("fs");

var moment = require("moment");


//all of my require functions are listed here on the top

var axios = require("axios");

var arg = process.argv;

console.log(arg);

// var movie = "";

var movieThis = function (movie) {
    // console.log(movie);
    
    if (!movie) {
        movie = "Mr.+Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
//the api for the movie data
    console.log(queryUrl);

    axios.get(queryUrl).then(function (response) {
        console.log(response.data);

        // console.log();
        console.log(`
                Title: ${response.data.Title}
                Year: ${response.data.Year}
                imbdRating: ${response.data.imdbRating}
                RottenTomatosRating: ${response.data.Ratings[1].Value}
                Country: ${response.data.Country}
                Language: ${response.data.Language}
                Plot: ${response.data.Plot}
                Actors: ${response.data.Actors}
                `);
                
            // var movieInfo = JSON.parse()
            // console.log(movieInfo);
            
        
        
        
    })
    // for (var i = 2; i < arg.length; i++) {
    // if (i > 2 && i < arg.length) {
    //     movieThis + "+" + arg[i];
    // }else {
    //     movieThis += arg[i];
}

// movieThis()
// the function for the spotify api 
function spotifyThisSong(songTitle) {
    console.log(`connection made, title is ${songTitle}`);
    if (!songTitle) {
        songTitle = "The Sign Ace of Base"
    }

    

    var spotify = new Spotify(keys.spotify);

    spotify.search({type: "track", query: songTitle, limit: 1}, function(err, data){

            
            // console.log(spotify);
        if(err){
          return  console.log(err);
            
        }
            var songInfo = data.tracks.items;
        // console.log(data.tracks.items[0].artists[0].name);
        
        // console.log(songInfo[0]);
        for (var i = 0; i < songInfo.length; i++){
            
            for (var j = 0; j < songInfo[i].artists.length; j++){
                console.log(songInfo[i].artists[j].name);
                
                
            }
            
            
            console.log(songInfo[i].name);
            console.log(songInfo[i].external_urls.spotify);
            console.log(songInfo[i].album.name);
            
        }
        
    })

}

function concertThis(artist) {
    console.log(`connection made, band is ${artist}`);
    
// the api for the bands in town 
    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    console.log(bandUrl);
    axios.get(bandUrl).then(function (response){
        // console.log(response.data);
        for(var i = 0; 0 < response.data.length; i++){
            // console.log(response.data[i]);
            console.log(`
            Name: ${response.data[i].venue.name}
            Country: ${response.data[i].venue.country}
            City: ${response.data[i].venue.city}
            EventDate: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}
            `);
            
        }
        

    })
}

var doWhatItSays = function(){
//this is connected to the spotify api
    fs.readFile("random.txt", "utf8", function(err, data){

        if(err) {
         return console.log(err);
            
        }

        var dataArr = data.split(",")

        action(dataArr[0], dataArr[1])
    })
}
//passing the information to the ombd key plus the movie var
// var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

// axios.get(queryUrl).then(function(err, response, body){
//     // console.log(response);
//     if(!err && response.statusCode === 200) {
//         var movieInfo = JSON.parse(body)
//     }
// })

//axios is getting the information from the api key

//use any of these terms in the switch statement to find what your looking for
var action = function (func, param) {
    switch (func) {
        case "concert-this":
        case "concert":
        case "c":
            concertThis(param)
            break;
        case "spotify-this-song":
        case "spotify":
        case "song":
        case "s":
            spotifyThisSong(param)
            break;
        case "movie-this":
        case "movie":
        case "m":
            movieThis(param)
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
        default:
            printHelp()
            break;
    }
}

action(process.argv[2].toLowerCase(), process.argv[3]);
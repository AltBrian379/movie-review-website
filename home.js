

const MOVIEDB_API_KEY = "5d3e3e5aa0a63f6e85a45adaf181e95a";
console.log(MOVIEDB_API_KEY);
const temp_movie_id = '605886';


const APILINK = `https://api.themoviedb.org/3/movie/${temp_movie_id}?api_key=${MOVIEDB_API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${MOVIEDB_API_KEY}&query=`;



const featured = document.getElementById('featured');

returnFeaturedMovie(APILINK);

function returnFeaturedMovie(url){
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data);

    })
}
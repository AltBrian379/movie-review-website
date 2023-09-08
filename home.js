require('dotenv').config();

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5d3e3e5aa0a63f6e85a45adaf181e95a&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.MOVIEDB_API_KEY}&query=`;


const featured = document.getElementById('featured');


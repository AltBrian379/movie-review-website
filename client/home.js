
const MOVIEDB_API_KEY = "5d3e3e5aa0a63f6e85a45adaf181e95a";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${MOVIEDB_API_KEY}&query=`;
//Step 1: Make connection to our local database and retrieve info 
const APILINK_MOVIE_REVIEWS = 'http://localhost:8000/api/v1/reviews';
let movie_id;
const featured = document.getElementById('featured-review-link');


/*API LINLK for Our API */
/*Call Back Test. By using this we ensure sequential execution of the functions. */

returnFeaturedMovieData(APILINK_MOVIE_REVIEWS + "/featured", function () {
    console.log("This happens next.")
    const APILINK = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MOVIEDB_API_KEY}`;
    returnFeaturedMovieData_TMDB(APILINK);
})

returnNewestMovieReviews(APILINK_MOVIE_REVIEWS + "/newest", function () {
    console.log("This happens after the list. Does nothing for now...")

})
//returnFeaturedMovieData_TMDB(APILINK);

// Function Bodies
// TODO REASEARCH ASYNC AWAIT
async function returnFeaturedMovieData(url, callback){
    await fetch(url).then(res => res.json())
    .then(function(data){
        console.log("This should happen first");
        movie_id = data.movie_id;
    })
    callback();
}

// Return list of newest movies
async function returnNewestMovieReviews(url, callback) {
    await fetch(url).then(res => res.json())
    .then(function(data){
        console.log("This is getting a list of movie reviews" + data);
    })
    callback();
    
}

function returnFeaturedMovieData_TMDB(url){
    fetch(url).then(res => res.json())
    .then(function(data){
        
        const db_poster = IMG_PATH + data.poster_path;
        const db_name = data.title;
        const db_release = data.release_date.slice(0,4)

        const image = document.createElement('img');
        image.setAttribute('alt','Featured Movie');

        const title = document.createElement('h4');

        //detail
        image.src = db_poster;
        title.innerHTML = db_name + " (" + db_release + ")";

        featured.appendChild(image);
        featured.appendChild(title);
    }) 
}

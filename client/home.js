
const MOVIEDB_API_KEY = "5d3e3e5aa0a63f6e85a45adaf181e95a";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${MOVIEDB_API_KEY}&query=`;
//Step 1: Make connection to our local database and retrieve info 
const APILINK_MOVIE_REVIEWS = 'http://localhost:8000/api/v1/reviews';

const featured = document.getElementById('featured-review-link');


/*API LINLK for Our API */
/*Call Back Test. By using this we ensure sequential execution of the functions. */

// NOTE:SEQ_EXEC: This should happen next

testforReview(APILINK_MOVIE_REVIEWS + "/2292");

returnFeaturedMovieData(APILINK_MOVIE_REVIEWS + "/featured", function (movie_id) {
    console.log("This happens next.")
    const APILINK = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MOVIEDB_API_KEY}`;
    returnFeaturedMovieData_TMDB(APILINK);
})

returnNewestMovieReviews(APILINK_MOVIE_REVIEWS + "/newest", (movie_id_list) => {
    const html_new_reviews = document.getElementById('new-reviews-list');
    movie_id_list.forEach(async (data) => {
        console.log("testing for each data: " + data.movie_id + "...");
        console.log(`https://api.themoviedb.org/3/movie/${data.movie_id}?api_key=${MOVIEDB_API_KEY}`)
        //let TMDB_data = await returnMovieData_TMDB(`https://api.themoviedb.org/3/movie/${data.movie_id}?api_key=${MOVIEDB_API_KEY}`);
        
        await fetch(`https://api.themoviedb.org/3/movie/${data.movie_id}?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(TMDB_data) {
            console.log(TMDB_data.poster_path + " Poster path");
            const movie_poster = IMG_PATH + TMDB_data.poster_path;
            const movie_name = TMDB_data.title;
            const movie_release = TMDB_data.release_date.slice(0,4);
    
            // Create elements 
            const image = document.createElement('img');
            image.setAttribute('alt',`new-movie-review-${movie_name}`)
    
            const title = document.createElement('h4');
            title.setAttribute("class","poster-title");
    
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class','movie-item-small');
    
            const anchor = document.createElement('a');
            anchor.setAttribute('href','./review.html') //temporary
    
            // Detailing...
            image.src = movie_poster;
            title.innerHTML = movie_name +  " (" + movie_release + ")";
            
            wrapper.appendChild(image);
            wrapper.appendChild(title);
    
            html_new_reviews.appendChild(wrapper);

        })    
    })
});

//returnFeaturedMovieData_TMDB(APILINK);

// Function Bodies
// TODO REASEARCH ASYNC AWAIT

// NOTE: SEQ_EXEC: This should happen first
async function returnFeaturedMovieData(url, callback){
    let movie_id;
    console.log(url + " returnFeaturedMovieData");
    await fetch(url).then(res => res.json())
    .then(function(data){
        
        console.log("This should happen first");
        console.log("This is getting a featured movie review" + JSON.stringify(data) + typeof data);
        console.log(data.movie_id)
        movie_id = data.movie_id;
    })
    callback(movie_id);
}

// Return list of newest movies
async function returnNewestMovieReviews(url, callback) {
    let movie_id;
    let movie_id_list;
    console.log(url + " returnNewestMovieReviews");
    await fetch(url).then(res => res.json())
    .then(function(data){
        console.log("This is getting a list of movie reviews: " + JSON.stringify(data) + typeof data);
        movie_id_list = data;
    })
    callback(movie_id_list);
}

async function returnFeaturedMovieData_TMDB(url){ 
    await fetch(url).then(res => res.json())
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


async function testforReview(url){
    console.log(url + " Testing");
    await fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.movie_id);
    })
}
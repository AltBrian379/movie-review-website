
const MOVIEDB_API_KEY = "5d3e3e5aa0a63f6e85a45adaf181e95a";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${MOVIEDB_API_KEY}&query=`;
//Step 1: Make connection to our local database and retrieve info 
const APILINK_MOVIE_REVIEWS = 'http://localhost:8000/api/v1/reviews';




/*API LINK for Our API */
/*Call Back Test. By using this we ensure sequential execution of the functions. */

// NOTE:SEQ_EXEC: This should happen next

returnFeaturedMovieData(APILINK_MOVIE_REVIEWS + "/featured", async function (movie_id) {
    console.log("This happens next.")
        let db_poster;
        let db_name
        let db_release;
        const featured = document.getElementById('featured-review');
    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(data) {
        
        db_poster = IMG_PATH + data.poster_path;
        db_name = data.title;
        db_release = data.release_date.slice(0,4)
    })
    //construct
    const image = document.createElement('img');
    image.setAttribute('alt','Featured Movie');
    const title = document.createElement('h4');
    const anchor = document.createElement('a');
    anchor.setAttribute('href',`./review.html?id=${movie_id}`);
    anchor.setAttribute('id','featured-review-link');
      //detail
    image.src = db_poster;
    title.innerHTML = db_name + " (" + db_release + ")";
    //build
    console.log(image+ "i" + anchor + "i" + title + "o" + featured);
    anchor.appendChild(image)
    anchor.appendChild(title)
    featured.appendChild(anchor)

    
})

returnNewestMovieReviews(APILINK_MOVIE_REVIEWS + "/newest", (movie_id_list) => {
    const html_new_reviews = document.getElementById('new-reviews-list');
    movie_id_list.forEach(async (data) => {
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
            anchor.setAttribute('href',`./review.html?id=${data.movie_id}`)
    
            // Detailing...
            image.src = movie_poster;
            title.innerHTML = movie_name +  " (" + movie_release + ")";
            
            anchor.appendChild(image);
            anchor.appendChild(title);

            wrapper.appendChild(anchor);
    
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

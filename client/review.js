const MOVIEDB_API_KEY = "5d3e3e5aa0a63f6e85a45adaf181e95a";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${MOVIEDB_API_KEY}&query=`;
//Step 1: Make connection to our local database and retrieve info 
const APILINK_MOVIE_REVIEWS = `http://localhost:8000/api/v1/reviews`;


const url = new URL(location.href);
const movie_id = url.searchParams.get("id");
console.log(movie_id)

getMovieData(APILINK_MOVIE_REVIEWS + `/${movie_id}`, async (movie_id) => {
    const html_new_reviews = document.getElementById('new-reviews-list');
    let movie_poster;
    let movie_name;
    let movie_director;
    let movie_release;
    let obj;
    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(TMDB_data) {
        console.log(TMDB_data.poster_path + " Poster path");
        movie_poster = IMG_PATH + TMDB_data.poster_path;
        movie_name = TMDB_data.title;
        movie_release = TMDB_data.release_date.slice(0,4);

    })

    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(TMDB_data) {
        movie_director = TMDB_data.crew.find(o => o.job ==="Director");

    })


    const image = document.createElement('img');
    image.setAttribute('alt',`new-movie-review-${movie_name}`)

    const title = document.createElement('h2');
    title.setAttribute("class","poster-title");

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class','movie-item-small');

    const director = document.createElement('h4');


    // Detailing...
    image.src = movie_poster;
    title.innerHTML = movie_name +  " (" + movie_release + ")";

    director.innerHTML = `Directed by ${movie_director.name}`;

    //Insertion
    const img_wrapper = document.getElementById('movie-review-info');
    img_wrapper.prepend(image);

    const movie_text_wrapper = document.getElementById('movie-text-wrapper');
    movie_text_wrapper.append(title);
    movie_text_wrapper.append(document.createElement('hr'));
    movie_text_wrapper.append(director);

    console.log(obj);
    
});

async function getMovieData(url, callback){
    let movie_id;
    console.log(url + " URL paramter");
    await fetch(url).then(res => res.json())
    .then(function(data){
        
        console.log("This should happen first");
        console.log(data.movie_id)
        movie_id = data.movie_id;
    })
    callback(movie_id);
}

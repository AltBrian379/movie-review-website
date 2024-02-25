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
    let movie_writer;
    let movie_release;
    let movie_synopsis;

    let obj;
    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(TMDB_data) {
        console.log(TMDB_data.poster_path + " Poster path");
        console.log(JSON.stringify(TMDB_data))
        movie_poster = IMG_PATH + TMDB_data.poster_path;
        movie_name = TMDB_data.title;
        movie_release = TMDB_data.release_date.slice(0,4);
        movie_synopsis = TMDB_data.overview;
        
    })

    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${MOVIEDB_API_KEY}`).then(res => res.json()).then(function(TMDB_data) {
        console.log(JSON.stringify(TMDB_data.crew))
        movie_director = TMDB_data.crew.find(o => o.job ==="Director");

        movie_writer = TMDB_data.crew.find(o => o.job === "Writer");
        if (!movie_writer){
            movie_writer = TMDB_data.crew.find(o => o.job === "Screenplay")
        }

    })

    

    const image = document.createElement('img');
    image.setAttribute('alt',`new-movie-review-${movie_name}`)

    const title = document.createElement('h2');
    title.setAttribute("class","poster-title");

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class','movie-item-small');

    const director = document.createElement('h4');
    
    const writer = document.createElement('h4');

    const synopsis = document.createElement('p');



    // Detailing...
    image.src = movie_poster;
    title.innerHTML = movie_name +  " (" + movie_release + ")";

    director.innerHTML = `Directed by ${movie_director.name}`;

    writer.innerHTML = `Written by ${movie_writer.name}`;

    synopsis.innerHTML = movie_synopsis;

    //Insertion
    const page_title = document.getElementById('page-title');
    page_title.innerHTML = movie_name +  " (" + movie_release + ") - WYWIA";

    const img_wrapper = document.getElementById('movie-review-info');
    img_wrapper.prepend(image);

    const movie_text_wrapper = document.getElementById('movie-text-wrapper');
    movie_text_wrapper.append(title);
    movie_text_wrapper.append(document.createElement('hr'));
    movie_text_wrapper.append(director);
    movie_text_wrapper.append(writer);
    movie_text_wrapper.append(synopsis);

    console.log(obj);
    
});

async function getMovieData(url, callback){
    let movie_id;
    let review_array;
    let verdict;
    let author;
    console.log(url + " URL paramter");
    await fetch(url).then(res => res.json())
    .then(function(data){
        
        console.log("This should happen first");
        console.log(data.movie_id)

        review_array = data.review;
        movie_id = data.movie_id;
        verdict = data.verdict;
        author = data.author;
    })

    const article = document.getElementById('main-article');

    //This block appends the verdict label;
    const verdict_title = document.createElement('h3');
    verdict_title.innerHTML = 'Verdict';
    article.appendChild(verdict_title);
    const verdict_label = document.createElement('div');
    verdict_label.setAttribute('class',`final-verdict verdict-${verdict}`);

    switch (verdict) {
        case '0':
            verdict_label.innerHTML = "<h4>I Would Watch it Religiously!</h4>";
            break;
        case '1':
            verdict_label.innerHTML = "<h4>I Would Watch It Again!</h4>";
            break;
        case '2':
            verdict_label.innerHTML = "<h4>Once is Enough</h4>";
            break;
        case '3':
            verdict_label.innerHTML = "<h4>If It's The Only Thing On</h4>";
            break;
        case '4':
            verdict_label.innerHTML = "<h4>I Want My Money Back!</h4>";
            break;
    }
    article.appendChild(verdict_label);
    article.appendChild(document.createElement('hr'));



    // This block appends the review. 
    review_array.forEach((element, index) => {
        
        const review_p = document.createElement('p');
        if (index === (review_array.length- 1)){
            const summary_div = document.createElement('div');
            summary_div.setAttribute('class','review-critical verdict-1');
            review_p.setAttribute('class','review-text')
            review_p.innerHTML = element;
            summary_div.appendChild(review_p);
            article.appendChild(summary_div);
        }
        else{
        review_p.setAttribute('class','review-text')
        review_p.innerHTML = element;
        article.appendChild(review_p);

        }
        
    });


    callback(movie_id);
}

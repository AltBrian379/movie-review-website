import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO { 
    /* This is where we make connection to our database. */
  
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db("movie_review_website").collection("Reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getFeaturedMovie() {
    try {
      return await reviews.findOne({ verdict : "1"})
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }
  
  static async getNewestMoviesList() {
    try {
      const myArray = [];
      const cursor = reviews.find({},{_id: 0, author: 0, movie_id: 1, review: 0, verdict: 0});
      await cursor.forEach((doc) => {

        myArray.push( {movie_id: doc.movie_id} )
      })
      return myArray;
      
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`)
      return { error: e}
    }
  }

  static async getReview(movieId) {
    try{
      return await reviews.findOne({movie_id: `${movieId}`});

    } catch(e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e}
    }
  }
}


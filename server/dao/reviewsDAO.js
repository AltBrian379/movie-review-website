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

      return await reviews.find().sort({_id:-1}).limit(5), () => {
        console.log(reviews);
      };
    } catch (e) {
      console.error(`Unable to get reviews`)
      return { error: e}
    }
  }
}


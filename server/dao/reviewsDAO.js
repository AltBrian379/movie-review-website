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
}
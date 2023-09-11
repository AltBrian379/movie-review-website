import ReviewsDAO from "../dao/reviewsDAO"

export default class ReviewsController {
    static async apiGetFeaturedMovie(req, res, next) {
        try {
            let featured = await ReviewsDAO.getFeaturedMovie();
            if (!reviews) {
                res.status(404).json({ error: "Not found" })
                return
              }
              res.json(reviews)
           
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    
}
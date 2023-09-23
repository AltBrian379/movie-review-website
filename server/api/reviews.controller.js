import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiGetFeaturedMovie(req, res, next) {
        try {
            let featured = await ReviewsDAO.getFeaturedMovie();
            if (!featured) {
                res.status(404).json({ error: "Not found" })
                return
              }
              res.json(featured)
           
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    
}

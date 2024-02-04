import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

//TODO: implement function in reviews.controller.js
//router.route("/movie/:id").get(ReviewsCtrl.apiGetReview)



router.route("/featured")
    .get(ReviewsCtrl.apiGetFeaturedMovie)

router.route("/newest")
    .get(ReviewsCtrl.apiGetNewestMovieReviews)

router.route("/:movieId")
    .get(ReviewsCtrl.apiGetReview)
export default router
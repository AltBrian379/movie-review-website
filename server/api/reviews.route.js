import express from "express"
import ReviewsCtrl from "./review.controller.js"

const router = express.Router()

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)

export default router
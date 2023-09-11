import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/:id")
        .get(ReviewsCtrl.apiGetReviews);

export default router  
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer")

// controller 
const moviesController = require("../controllers/moviesController")

//routes
router.get("/", moviesController.index)

router.get("/:id", moviesController.show)

router.post("/", upload.single("image"), moviesController.store)

router.post("/:id/reviews", moviesController.storeReview)

module.exports = router;
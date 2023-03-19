var express = require('express');
var router = express.Router();

const VideoCategoryController = require("../controller/VideoCategoryController")
//Post routes
router.route("/AddVideoCategory").post(
    VideoCategoryController.createVideoCategory
)




//Get Routes
router.route("/GetVideoCategory/:id").get(
    VideoCategoryController.getVideoCategory
)

router.route("/GetAllVideoCategories").get(
    VideoCategoryController.getAllVideoCategories
)




//Put Routes
router.route("/EditVideoCategory/:id").put(
    VideoCategoryController.updateVideoCategory
)

//Delete Routes
router.route("/DeleteVideoCategory/:id").delete(
    VideoCategoryController.deleteVideoCategory
)





module.exports = router;
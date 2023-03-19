var express = require('express');
var router = express.Router();

const ClubController = require("../controller/ClubController")
const FolderController = require("../controller/FolderController")

//Get Routes
router.route("/GetClub").get(
    ClubController.getClub
)
router.route("/GetFolders").get(
    ClubController.getFolders
)

// Edit Routes
router.route("/EditClub/:id").post(
    ClubController.editFolder
)

router.route("/GetAllFolderFiles/:id").get(
    FolderController.getAllfolderFiles
)

//Post Routes
router.route("/CreateClub").post(
    ClubController.createClub
)

router.route("/CreateFolder/:id").post(
    ClubController.createFolder
)

router.route("/AddFileInFolder/:id").post(
    FolderController.addFileinFolder
)

//Delete Routes
router.route("/DeleteFolder/:F_id&:C_id").post(
    ClubController.deleteFolder,
    FolderController.deleteFolder
    

)

router.route("/RemoveFileFromFolder/:id").post(
    FolderController.deleteFilefromFolder
)



module.exports = router;
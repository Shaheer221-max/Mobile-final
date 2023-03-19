var express = require("express");

var router = express.Router();
const UserController = require("../controller/UserController");
const AdminNotificationController = require("../controller/AdminNotificationController");

/* GET users listing. */
router.route("/GetAllUsers").get(UserController.getAllUsers);

router.route("/GetAllPlayers").get(UserController.getAllPlayers);

router.route("/GetAllCoaches").get(UserController.getAllCoaches);

router.route("/GetAllPendingUsers").get(UserController.getAllPendingUsers);

router.route("/GetLeftPlayers").get(UserController.getleftPlayers);

router.route("/ParentSignup").post(UserController.addParent);
router.route("/UpdatePassword").post(UserController.UserPasswordUpdate);
router
  .route("/signup")
  .post(UserController.addUser, AdminNotificationController.AddNotification);
router.route("/signin").post(UserController.login);
router.route("/forgetPassword").post(UserController.forgetPassword);
router.route("/resetPassword/:token").patch(UserController.resetPassword);

//Protect all routes after this middleware
router.route("/allUsers").get(
  UserController.protect,
  // UserController.restrictTo('admin'),
  UserController.getUser
);
router.route("/singleUser/:id").get(
  // UserController.protect,
  // UserController.restrictTo('admin'),
  UserController.singleuser
);

router
  .route("/getUserDetailsUsingProtect")
  .get(UserController.protect, UserController.provideUserdetails);

router
  .route("/deleteUser/:id")
  .delete(

    UserController.protect,

    UserController.delete
  );

router
  .route("/updatePassword")
  .put(UserController.updatePassword);


router.route("/updateMe").patch(
  UserController.protect,
  UserController.uploadUserPhoto, //phla hum image ko memory ma store karva dain ga or sath phly isa filter bhi kara ga ya image ha k nhi
  UserController.resizeUserPhoto, //agar image hovi to hum buffer k zarya usa hasil kar la ga q k vo memory ma ha or jab usa resize kar da ga to phr hum usa disk pa store kar da ga
  UserController.updateMe
);

router.route("/updateUser/:id").put(
  // UserController.protect,
  // UserController.restrictTo('admin'),
  UserController.updateUser
);

router
  .route("/deleteMe")
  .delete(UserController.protect, UserController.deleteMe);

router
  .route("/me")
  .get(UserController.protect, UserController.getMe, UserController.singleuser);

module.exports = router;

//get and delete ma body ma kuch nahi bajhta

//post and patch ma body ma data bajhta ha

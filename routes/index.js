var express = require("express");
var router = express.Router();

//Require controller modules
const user_controller = require("../controllers/userController");

//Redirect to /sign-up
router.get("/", user_controller.index);

//GET request for sign up form
router.get("/sign-up", user_controller.user_create_get);

//POST request to sign up a user
router.post("/sign-up", user_controller.user_create_post);

//GET request for login form
router.get("/login", user_controller.user_login_get);

//POST request to log in user
router.post("/login", user_controller.user_login_post);

//GET request to log out user
router.get("/logout", user_controller.user_logout_get);

module.exports = router;

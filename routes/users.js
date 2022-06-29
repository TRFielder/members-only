var express = require("express");
var router = express.Router();

//Require controller modules
const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//GET request for sign up form
//router.get("/sign-up", (req, res) => res.render("sign-up-form"));

//POST request to sign up a user
//router.post("/sign-up", user_controller.user_create_post);

module.exports = router;

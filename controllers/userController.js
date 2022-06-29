const User = require("../models/User");

const { mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.index = function (req, res) {
  res.render("index", {
    title: "Members only",
    user: req.user,
  });
};

exports.user_create_get = function (req, res) {
  res.render("sign-up-form", {
    title: "Sign up form",
  });
};

exports.user_create_post = [
  //Validate and sanitise user signup form inputs
  body("username").custom((username) => {
    User.findOne({ username: username }).exec(function (err, found_user) {
      if (found_user) {
        throw new Error("Chosen username already exists");
      }
    });
    //Indicates success of custom validator
    return true;
  }),

  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
  body("password_confirm", "Both password fields must match").custom(
    (password_confirm, { req }) => {
      if (password_confirm !== req.body.password) {
        throw new Error("Password confirmation does not match");
      }
      //Indicates success of custom validator
      return true;
    }
  ),
  body("username").trim(),
  body("fname").trim(),
  body("lname").trim(),

  (req, res, next) => {
    //Extract the validation errors from a result
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //There are errors. Render the form again with sanitised values/error messages
      res.render("sign-up-form", {
        title: "Sign up form",
        form_data: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      //Data from form is valid
      //Create the new user and save to database
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            username: req.body.username,
            first_name: req.body.fname,
            last_name: req.body.lname,
            password: hashedPassword,
          }).save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      });
    }
  },
];

exports.user_login_get = function (req, res) {
  res.render("login");
};

exports.user_login_post = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

exports.user_logout_get = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //User logged out, redirect to index
    res.redirect("/");
  });
};

const Message = require("../models/Message");
const User = require("../models/User");

const { mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.create_message_get = function (req, res) {
  //If user is not logged in, redirect them to the login page
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }
  //User is logged in, render the message-form view
  res.render("message-form", {
    user: res.locals.currentUser,
  });
};

exports.create_message_post = [
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message-form", {
        user: res.locals.currentUser,
        errors: errors.array(),
      });
      return;
    } else {
      //Data from form is valid
      //Create the new message and save to the database
      const message = new Message({
        author: req.user._id,
        text: req.body.messageText,
        timestamp: Date.now(),
      }).save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];

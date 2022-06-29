const User = require("../models/User");

const { mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");

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

exports.user_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User create POST");
};

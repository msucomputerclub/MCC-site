const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//User Model
const User = require("../../models/User");

//Input Validation
const validateRegisterInput = require("../../validation/register");

//@route GET /api/users/test
//@desc test users route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "user route works" });
});

//@route POST /api/users/register
//@desc register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "User already exists";
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName
        });
        console.log(newUser);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//  @route  GET api/users/all
//  @desc   Get all users
//  @access Public
router.get("/all", (req, res) => {
  const errors = {};
  User.find()
    .then(users => {
      if (!users) {
        errors.nousers = "There are no users";
        return res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({ users: "There are no users" }));
});

//  @route  DELETE api/users/
//  @desc   Delete user
//  @access Public
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;

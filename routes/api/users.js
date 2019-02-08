const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//User Model
const User = require("../../models/User");

//Input Validation

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
  //check validation

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists";
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;

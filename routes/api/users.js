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
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
        console.log(newUser);

        bcrypt.genSalt(10, (err, salt) => {
          console.log("bcrypting");
          if (err) console.log("gensalt error");
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log("hash error");
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

module.exports = router;

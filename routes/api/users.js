const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//User Model
const User = require("../../models/User");

//Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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

//  @route  POST api/users/login
//  @desc   login user
//  @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User mathed

        //Create JWT payload
        const payload = {
          id: user.id,
          role: user.role,
          email: user.email
        };

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
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

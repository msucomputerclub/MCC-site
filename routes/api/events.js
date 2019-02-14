const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureRole = require("../../validation/ensureRole");

//User Model
const User = require("../../models/User");
//Event Model
const Event = require("../../models/Event");

//@route GET /api/events/all
//@desc get all events
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  Event.find()
    .then(events => {
      if (!events) {
        errors.noevents = "There are no events";
        return res.status(404).json(errors);
      }
      res.json(events);
    })
    .catch(err => res.status(404).json({ users: "There are no users" }));
});

//@route POST /api/events/create
//@desc create event
//@access Private (Board+)
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  //ensure role of board
  if (!ensureRole(req.user.role, "board")) {
    errors.notauthorized = "You are not authorized to create an event";
    res.status(401).json(errors);
  } else {
    res.json({ success: true });
  }
});

module.exports = router;

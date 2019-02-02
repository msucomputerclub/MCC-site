const express = require("express");
const router = express.Router();
const request = require("request");

//import validation

//import models

//Routes

// @route GET api/profile/qr
// @desc Get user QR code
// @access Private
router.get("/qr/:data", (req, res) => {
  //TODO: protect this route
  //TODO: set ?data to req.user.email when database is set
  var apiURL = `https://api.qrserver.com/v1/create-qr-code/?data=${req.params.data}&size=100x100`;
  var requestSettings = {
    url: apiURL,
    method: "GET"
  };
  request(requestSettings, function(error, response, body) {
    if (error) {
      res.status(404).json(error);
    }
  }).pipe(res);
});

module.exports = router;

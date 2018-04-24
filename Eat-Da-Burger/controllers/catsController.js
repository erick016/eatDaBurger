var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
    console.log(req.body);
  });
});

router.post("/api/cats", function(req, res) {
  console.log('jakes test')
	cat.create([
	      "name", "eaten" //table name, db name, boolean, and cat name?
  ], [
    req.body.name, req.body.eaten
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
    console.log(req.body);
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    eaten: req.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    console.log(req.body);});
});

// Export routes for server.js to use.
module.exports = router;

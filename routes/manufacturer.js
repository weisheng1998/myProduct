var sanitizeHtml = require("sanitize-html");
var express = require("express");
var router = express.Router();
var connection = require("../database.js");
const { check, validationResult } = require("express-validator");

//List all manufacturer
router.get("/", function (req, res, next) {
  //knex connection
  connection
    .raw(`select * from manufacturer;`) // it is a promise
    .then(function (result) {
      var manufacturers = result[0];
      // send back the query result as json
      res.json(200, {
        manufacturers: manufacturers,
      });
    })
    .catch(function (error) {
      // log the error
      console.log(error);
      res.json(500, {
        message: error,
      });
    });
});

//retrieve manufacturer by id
router.get("/:id", check("id").isInt(), function (req, res, next) {
  //knex connection
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  connection
    .raw(`select * from manufacturer where id = ?`, [
      sanitizeHtml(req.params.id),
    ])
    .then(function (result) {
      var manufacturers = result[0];
      // send back the query result as json
      res.json(200, {
        manufacturer: manufacturers[0],
      });
    })
    .catch(function (error) {
      // log the error
      console.log(error);
      res.json(500, {
        message: error,
      });
    });
});

//delete a manufacturer by id
router.delete("/:id", check("id").isInt(), function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  var promise = connection.raw(
    `
      delete from manufacturer
      where id = ?
      `,
    [sanitizeHtml(req.params["id"])]
  );
  promise
    .then(function (result) {
      res.json(200, {
        message: "Done",
      });
    })
    .catch(function (error) {
      // log the error
      console.log(error);
      res.json(500, {
        message: error,
      });
    });
});

//create a manufacturer
router.post("/", check("name").notEmpty(), function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  var promise = connection
    .raw(
      `
    insert into manufacturer (name)
    values (?)
    `,
      [sanitizeHtml(req.body["name"])]
    )
    .then(function (result) {
      res.json(201, {
        message: "Done",
      });
    })
    .catch(function (error) {
      // log the error
      console.log(error);
      res.json(500, {
        message: error,
      });
    });
});

//update a manufacturer by id
router.put("/:id", check("id").isInt(), function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  var promise = connection.raw(
    `
    update manufacturer
    set name = ?
    where id = ?
    `,
    [sanitizeHtml(req.body["name"]), sanitizeHtml(req.params["id"])]
  );
  promise
    .then(function (result) {
      res.json(200, {
        message: "Done",
      });
    })
    .catch(function (error) {
      // log the error
      console.log(error);
      res.json(500, {
        message: error,
      });
    });
});

module.exports = router;

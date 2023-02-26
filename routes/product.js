var sanitizeHtml = require("sanitize-html");
var express = require("express");
var router = express.Router();
var connection = require("../database.js");
const { check, validationResult } = require("express-validator");

//List all products
router.get("/", function (req, res, next) {
  //knex connection
  connection
    .raw(`select * from product;`) // it is a promise
    .then(function (result) {
      var products = result[0];
      // send back the query result as json
      res.json(200, {
        products: products,
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

//retrieve product by id
router.get("/:id", check("id").isInt(), function (req, res, next) {
  //knex connection
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  connection
    .raw(`select * from product where id = ?`, [sanitizeHtml(req.params.id)])
    .then(function (result) {
      var product = result[0];
      // send back the query result as json
      res.json(200, {
        product: product[0],
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

//delete a product by id
router.delete("/:id", check("id").isInt(), function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  var promise = connection.raw(
    `
        delete from product
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

//create a product
router.post(
  "/",
  check("name").notEmpty(),
  check("price").notEmpty(),
  check("manufacturer_id").notEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // error response
      return res.status(400).json({ errors: errors.array() });
    }

    //console.log("POST Request", req.body);
    var promise = connection
      .raw(
        `
      insert into product (name,price,manufacturer_id)
      values (?,?,?)
      `,
        [
          sanitizeHtml(req.body["name"]),
          sanitizeHtml(req.body["price"]),
          sanitizeHtml(req.body["manufacturer_id"]),
        ]
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
  }
);

//update a product by id
router.put("/:id", check("id").isInt(), function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // error response
    return res.status(400).json({ errors: errors.array() });
  }
  //console.log("PUT Request", req.body);
  var promise = connection.raw(
    `
      update product
      set name = ?,price=?,manufacturer_id=?
      where id = ?
      `,
    [
      sanitizeHtml(req.body["name"]),
      sanitizeHtml(req.body["price"]),
      sanitizeHtml(req.body["manufacturer_id"]),
      sanitizeHtml(req.params["id"]),
    ]
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

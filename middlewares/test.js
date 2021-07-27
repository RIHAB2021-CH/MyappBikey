const { body, validationResult } = require("express-validator");
const Owner = require("../models/owner");
// Test if i have a user (owner) with the given email in my DB 
exports.test = () => {
  body("email").custom((value) => {
    console.log("email : ", value);
    const owner = Owner.findOne({ value });

    try {
      if (owner) {
        return Promise.reject("E-mail already in use");
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = validator = (req, res, next) => {
  const errors = validationResult(req);

  errors.isEmpty() ? next() : res.json({ errors: errors.array() });
};

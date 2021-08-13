const { check, validationResult } = require("express-validator");

// Validation of the registration (registration rules)
exports.registerRules = () => [
  check("fullName", "This field is required").notEmpty(),
  check("ashop", "This field is required").notEmpty(),
  check("email", "this field is required").notEmpty(),
  check("email", "this is not a valid email").isEmail(),
  check("city", "this is not a valid email").notEmpty(),
  check("phone", "this is not a valid email").notEmpty(),
  check("password", "This is not a valid password").isLength({
    min: 8,
    max: 20,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);

  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};

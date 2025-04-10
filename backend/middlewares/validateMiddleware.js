// middlewares/validate.js
const { validate } = require("jsonschema");
const validateSchema = (schema) => (req, res, next) => {
  const result = validate(req.body, schema);
  if (!result.valid) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.errors.map((e) => e.stack),
    });
  }
  next();
};

module.exports = validateSchema;

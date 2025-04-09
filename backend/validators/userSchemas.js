// validators/userSchemas.js
module.exports = {
  registerSchema: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", minLength: 2 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
    },
    additionalProperties: false,
  },
  loginSchema: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
  },
};

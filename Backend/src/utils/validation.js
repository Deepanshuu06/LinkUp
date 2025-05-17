const validator = require("validator");

const validateSignUpData = (req) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "username",
    "email",
    "password",
    "shortDescription",
    "skills",
    "photoUrl",
    "gender",
    "age",
    "phone",
  ];

  const requestFields = Object.keys(req.body);
  const isValid = requestFields.every((key) => requiredFields.includes(key));

  if (!isValid) {
    throw new Error("Invalid Field in Body");
  }
};

const validateLoginData = (req) => {
  const { email, password } = req.body;
  const requiredFields = ["email", "password"];
  const requestFields = Object.keys(req.body);

  const hasAllRequiredFields = requiredFields.every((fields) =>
    requestFields.includes(fields)
  );

  const hasOnlyValidFields = requestFields.every((fields) =>
    requiredFields.includes(fields)
  );

  if (!hasAllRequiredFields || !hasOnlyValidFields) {
    throw new Error("Invalid fields in body");
  }

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Enter Correct email");
  }
};

module.exports = { validateSignUpData, validateLoginData };

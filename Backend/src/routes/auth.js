const express = require("express");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //creating the new instance of the user model
    //validation of data
    const { username, email, password, ...rest } = req.body;

    validateSignUpData(req);

    const [isUserNameExist, isEmailExist] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (isUserNameExist) {
      return res.status(409).send("Username already taken");
    }
    if (isEmailExist) {
      return res.status(409).send("Email already exists");
    }

    //password encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: rest.firstName,
      lastName: rest.lastName,
      username: username,
      email: email,
      phone: rest.phone,
      age: rest.age,
      gender: rest.gender,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error in saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validateLoginData(req);

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("Invalid Credentials");
    }

    //comparing password through bcrypt
    const isPasswordValid = await user.validatePassword(password);

    // console.log(isPasswordValid);
    
    if (isPasswordValid) {
      // create a JWT Token
      const token = await user.getJWT();

      // add a token to cookie and send the response to the user
      res.cookie("token", token);

      res.send("Login Successful");
    } else {
      res.status(404).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(404).send("Unable to logIn " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("Logout Successful");
  } catch (error) {
    res.status(500).send("Unable to logOut " + error.message);
  }
});


authRouter.post("/forgotpassword", async (req, res) => {});

module.exports = authRouter;

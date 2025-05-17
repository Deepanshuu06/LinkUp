const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
      email: email,
      username: username,
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    validateLoginData(req);

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("Invalid Credentials");
    }

    //comparing password through bcrypt
    const isPasswordValid = user.validatePassword(password)
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send("Unable to get user profile" + error);
  }
});


app.patch("/user/:userId", userAuth, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params?.userId;
    const allowedUpdates = [
      "firstName",
      "lastName",
      "shortDescription",
      "skills",
      "photoUrl",
      "gender",
      "age",
      "phone",
      "password",
    ];
    const isupdateValid = Object.keys(data).every(
      (k) => allowedUpdates.includes(k) && data[k] !== undefined
    );

    if (!isupdateValid) {
      res.status(400).send("Invalid updates");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User updated successfully" + updatedUser);
  } catch (err) {
    res.status(404).send("User not updated :  " + err.message);
  }
});

app.delete("/delete", userAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("user cant delete " + err.message);
  }
});


connectDB()
  .then(() => {
    console.log("database successfully connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected " + err.message);
  });

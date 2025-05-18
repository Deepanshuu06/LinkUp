const express = require("express");

const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send("Unable to get user profile" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;
    const allowedUpdates = [
      "firstName",
      "lastName",
      "shortDescription",
      "skills",
      "photoUrl",
      "gender",
      "age",
      "phone",
    ];
    const isupdateValid = Object.keys(data).every(
      (k) => allowedUpdates.includes(k) && data[k] !== undefined
    );

    if (!isupdateValid) {
      return res.status(400).send("Invalid update fields");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send(updatedUser.firstName + " Your profile was updated successfully");
  } catch (err) {
    res.status(404).send("User not updated: " + err.message);
  }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.clearCookie("token");
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Unable to delete user: " + err.message);
  }
});

profileRouter.post("/change-password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const requiredFields = ["oldPassword", "newPassword"];
    const requestFields = Object.keys(req.body);
    const hasAllRequiredFields = requiredFields.every((fields) =>
      requestFields.includes(fields)
    );
    const hasOnlyValidFields = requestFields.every((fields) =>
      requiredFields.includes(fields)
    );
    if (!hasAllRequiredFields || !hasOnlyValidFields) {
      return res.status(400).send("Invalid fields in body");
    }
    if (!oldPassword || !newPassword) {
      return res.status(400).send("Old and new passwords are required");
    }
    const isPasswordValid = await user.validatePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid old password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).send("New password is not strong enough");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: newPasswordHash },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send("Password changed successfully");
  } catch (error) {
    res.status(500).send("Unable to change password: " + error.message);
  }
});

module.exports = profileRouter;

const express = require("express");

const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

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
      return res.status(400).send("Invalid Edit Request");
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

profileRouter.delete("/delete", userAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("user cant delete " + err.message);
  }
});

module.exports = profileRouter;

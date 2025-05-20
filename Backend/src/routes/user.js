const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "username",
  "photoUrl",
  "skills",
  "age",
  "gender",
  "shortDescription",
];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  // get all the pending request for the loggedin user
  // checking the user is loggedin or not

  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "Interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No connection requests found",
      });
    }
    const data = connectionRequests.map((row) => row.fromUserId);

    res.json({
      message: "Fetched requests successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Unable to fetch the requests " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  // check userLoggedIn
  // find the only Connection request where the status is accepted
  try {
    const loggedInUser = req.user;

    const Connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      status: "Accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (Connections.length === 0) {
      return res.status(404).json({
        message: "No Connections found",
      });
    }

    const data = Connections.map((row) => row.fromUserId || row.toUserId);

    res.json({
      message: "Fetched Connections Successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Unable to fetch Connections" + error.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  // user can seee all the users card except
  // 1. his own card
  // 2. his connections card
  // 3. already ignored
  // 4. request already sent

  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    limit = limit >50 ? 50 : limit;


    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideDataFromFeed = new Set();

    connectionRequest.forEach((element) => {
      hideDataFromFeed.add(element.toUserId.toString()),
        hideDataFromFeed.add(element.fromUserId.toString());
    });

    const users = await User.find({
      _id: { $ne: loggedInUser._id },
      _id: { $nin: Array.from(hideDataFromFeed) },
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    res.send(users);
  } catch (error) {
    res.status(400).send("Unable to fetch the data " + error.message);
  }
});

module.exports = userRouter;

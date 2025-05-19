const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["Ignored", "Interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid status type " + status,
        });
      }

      if (fromUserId.toString() === toUserId) {
        return res.status(400).json({
          message: "You can not send request to yourself",
        });
      }

      const isToUserExist = await User.findById(toUserId);
      if (!isToUserExist) {
        return res.status(404).json({
          message: "User not Found",
        });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "Connection request already exist",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName +
          " is " +
          status +
          " in " +
          isToUserExist.firstName,
        status: "success",
        data,
      });
    } catch (error) {
      res.status(400).send("Unable to send request " + error.message);
    }
  }
);

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const loggedInUser = req.user;

    // checking the status valid
    // checking the requestId is valid
    // is UserLogged  === toUserId match
    // if the status was intrested then only user can review the request
    // if the request is in ignroed state then no one can change the status

    const allowedStatus = ["Accepted", "Rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(404).json({
        tyoe: "error",
        message: "Status Not Allowed",
      });
    }

    

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId:loggedInUser._id,
      status: "Interested",
    });


    
    if (!connectionRequest) {
      return res.status(404).json({
        tyoe: "error",
        message: "Connection Request Not Found",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({
      message: "Connection Request " + status,
      data,
    });
  } catch (error) {
    res.status(400).send("Unable to review request " + error.message);
  }
});

module.exports = requestRouter;

const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

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
      
      
     if(fromUserId.toString() === toUserId){
        return res.status(400).json({
          message: "You can not send request to yourself",
        });
      }

      const isToUserExist = await User.findById(toUserId)
      if(!isToUserExist){
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
        message: "Connection request sent Successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Unable to send request " + error.message);
    }
  }
);

module.exports = requestRouter;

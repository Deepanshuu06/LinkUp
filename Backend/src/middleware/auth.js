const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Exist");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = { userAuth };

const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "Minimum 2 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Minimum 2 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Picture Url" + value);
        }
      },
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [40, "Maximum 40 characters allowed"],
    },

    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: " maximum number of skills allowed (10)",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Minimum 2 characters required"],
      maxlength: [20, "Maximum 20 characters allowed"],
      match: /^[a-zA-Z0-9_]+$/, // Alphanumeric and underscores
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    age: {
      type: Number,
      min: [13, "Age must be at least 13"],
      max: [120, "Age must be at most 120"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

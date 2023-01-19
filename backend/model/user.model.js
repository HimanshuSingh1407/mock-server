const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    trim: true,
  },
});

//convert password to hash
userModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 6;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//token genration function
userModel.methods.generatedToken = async function () {
  try {
    const token = jwt.sign({ id: this._id }, "SINGH789", {
      expiresIn: "7 days",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

//password check function
userModel.methods.isMatched = async function (password) {
  try {
    const checked = await bcrypt.compare(password, this.password);
    return checked;
  } catch (error) {
    console.log(error.message);
  }
};


const User = model("user", userModel);

module.exports = User;

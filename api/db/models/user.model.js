const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// const jwtSecret = "19585415999853647309dfjlsdjfldsjlj8313785083";
const jwtSecret = process.env.JWT_SECRET;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "admin", "supervisor"],
    },
    _hostCompanyId: {
      type: mongoose.Types.ObjectId
    },
    sessions: [
      {
        token: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Number,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    }
  },
  { timestamps: true }
);

/* INSTANCE METHODS */
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.omit(userObject, ["password", "sessions"]);
};

UserSchema.methods.createSession = async function () {
  let user = this;

  try {
    let refreshToken = await user.generateRefreshAuthToken();
    saveSessionToDatabase(user, refreshToken);
    return refreshToken;
  } catch(error) {
    return `Failed to save session to database.\n ${e}`;
  }
};

UserSchema.methods.generateRefreshAuthToken = async function () {
  let buffer = crypto.randomBytes(64);
  let token = buffer.toString("hex");
  return token;
};

// jwt.sign maybe role
UserSchema.methods.generateAccessAuthToken = async function() {
  const user = this;
  let token = jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15m" });
  return token;
}
/* END OF INSTANCE METHODS */

/* MODEL METHODS */
UserSchema.statics.getJWTSecret = () => {
  return jwtSecret;
}

UserSchema.statics.findByIdAndToken = async function (_id, token) {
  const User = this;

  return await User.findOne({
    _id,
    "sessions.token": token,
  });
};

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceEpoch = Date.now() / 1000;
  return !(expiresAt > secondsSinceEpoch);
}

UserSchema.statics.findByCredentials = async function(email, password) {
  let User = this;
  try {
    let user = await User.findOne({ email });
    if(user) {
      let isPasswordValid = await bcrypt.compare(password, user.password);
      if(isPasswordValid) {
        return user;
      }
    }
  } catch(error) {
    return error;
  }

}
/* END OF MODEL METHODS */

/* MIDDLEWARE */
UserSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } else {
    next();
  }
});
/* END OF MIDDLEWARE */

/* HELPER METHODS */
let saveSessionToDatabase = async (user, refreshToken) => {
  let expiresAt = generateRefreshTokenExpiryTime();

  user.sessions.push({ token: refreshToken, expiresAt });

  try {
    await user.save();
    return refreshToken;
  } catch (error) {
    return error;
  }
};

let generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = "10";
  let secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
  return Date.now() / 1000 + secondsUntilExpire;
};
/* END OF HELPER METHODS */

const User = new mongoose.model("user", UserSchema);

module.exports = User;

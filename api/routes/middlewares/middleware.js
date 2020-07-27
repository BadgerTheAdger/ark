const jwt = require("jsonwebtoken");
const User = require("../../db/models/user.model");

let verifySession = async (req, res, next) => {
  let refreshToken = req.header("x-refresh-token");
  let _id = req.header("_id");

  try {
    let user = await User.findByIdAndToken(_id, refreshToken);
    if (!user) {
      throw new Error(
        "User not found. Make sure that the refresh token and user id are correct"
      );
    } else {
      req.user_id = user._id;
      req.userObject = user;
      req.refreshToken = refreshToken;

      let isSessionValid = false;

      user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
          if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
            isSessionValid = true;
            console.log('test');
          }
        }
      });

      if (isSessionValid) {
        next();
      } else {
        throw new Error("Refresh token has expired or the session is invalid");
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

let authenticate = async (req, res, next) => {
  let token = req.header("x-access-token");

  jwt.verify(token, User.getJWTSecret(), (error, decoded) => {
    if (error) {
      res.status(401).send();
    } else {
      // role
      req.user_id = decoded._id;
    //   req.user_role = decoded.role;
    //   console.log(req.user_role);
      next();
    }
  });
};

module.exports = { verifySession, authenticate };

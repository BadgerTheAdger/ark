const User = require("../../db/models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const pathToDefaultImage = path.join(process.cwd(), 'assets', 'images', 'default.png');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      role: role || "supervisor",
      _hostCompanyId: req.params._hostCompanyId || null,
      avatar: await defaultImageBuffer()
    });
    await newUser.save();
    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.generateAccessAuthToken();
    res
      .header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    let user = await User.findByCredentials(email, password);
    let refreshToken = await user.createSession();
    let accessToken = await user.generateAccessAuthToken();
    res
      .header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .send(user);
  } catch (error) {
    next(error);
  }
};

exports.getAccessToken = async (req, res, next) => {
  try {
    let accessToken = await req.userObject.generateAccessAuthToken();
    res.header("x-access-token", accessToken).send({ accessToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.user_id });
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    let user = await User.findOne({ _id: req.header("_id") });
    user.avatar = buffer;
    await user.save();
    res.send({ avatar: buffer });
  } catch (error) {
    next(error);
  }
};

exports.getAvatar = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send({ avatar: user.avatar });
    } catch (error) {
        res.status(400).send(); 
    }
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUser = async (req, res, next) => {};

exports.updateUser = async (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {};

// Make every controller and all pages at front end (only then permissions and food logic)
// Worker has an avatar (problem)

exports.createCompany = async (req, res, next) => {};
exports.createWorker = async (req, res, next) => {};
exports.createAnimal = async (req, res, next) => {};

// exports.grantAccess = function (action, resourse) {
//   return async (req, res, next) => {
//     try {
//       const permission = roles.can(req.user.role)[action](resourse);

//       if (!permission.granted) {
//         return res.status(401).json({
//           error: "You don't have enough permission to perform this action",
//         });
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

async function defaultImageBuffer() {
    return await sharp(pathToDefaultImage).toBuffer();
}
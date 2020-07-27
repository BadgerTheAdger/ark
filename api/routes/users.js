const express = require('express');
const router = express.Router();
const userController = require("./controllers/user.controller");
const { verifySession, authenticate } = require("../routes/middlewares/middleware");
const multer = require("multer");

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a file with jpg/jpeg/png extension'));
        }

        cb(undefined, true);
    }
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/access-token', verifySession, userController.getAccessToken);

router.get('/user/:userId', userController.getUser);

router.get('/users', userController.getUsers);

router.get('/users/me', authenticate, userController.getProfile);

router.post('/users/me/avatar', authenticate, upload.single('avatar'), userController.uploadAvatar);

router.get('/users/:id/avatar', authenticate, userController.getAvatar);

router.patch('/user/:userId', userController.updateUser);

router.delete('/user/:userId', userController.deleteUser);

module.exports = router;
const userController = require("../controllers/userInfoController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const userRouter = express.Router();

userRouter.post('/',userController.addUser);
userRouter.get('/', userController.getUserAssignmentData);
userRouter.get('/', userController.getUserPopupData);

module.exports = userRouter;
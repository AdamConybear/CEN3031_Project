const commentController = require("../controllers/commentController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const commentRouter = express.Router();
commentRouter.post('/', commentController.addCommentData);
commentRouter.get('/', commentController.findCommentData);
module.exports = commentRouter;
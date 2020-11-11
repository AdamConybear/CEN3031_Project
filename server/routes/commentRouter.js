const commentController = require("../controllers/commentController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const commentRouter = express.Router();
commentRouter.post('/', commentController.addCommentData);
commentRouter.get('/', commentController.getCommentsByClass);
commentRouter.put('/like/:commentId', commentController.updateLike);
commentRouter.put('/dislike/:commentId', commentController.updateDislike);
commentRouter.put('/flag/:commentId', commentController.updateFlags);

module.exports = commentRouter;
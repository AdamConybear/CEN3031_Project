const weekController = require("../controllers/weekController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const weekRouter = express.Router();

weekRouter.post('/',weekController.addAssignmentData);
weekRouter.get('/',weekController.getDataFromAssignment);

module.exports = weekRouter;
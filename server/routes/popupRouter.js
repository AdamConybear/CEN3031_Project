const popupController = require("../controllers/popupController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const popupRouter = express.Router();
popupRouter.post('/',popupController.addPopData);
popupRouter.get('/', popupController.getDailyData);
module.exports = popupRouter;
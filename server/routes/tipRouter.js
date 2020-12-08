const tipController = require("../controllers/tipController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const tipRouter = express.Router();

tipRouter.post('/',tipController.addTipData);
tipRouter.get('/reviewed',tipController.findTipDataReviewed);
tipRouter.get('/accepted',tipController.findTipDataAccepted);
tipRouter.get('/random',tipController.getRandomTip);


module.exports = tipRouter;
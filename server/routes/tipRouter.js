const tipController = require("../controllers/tipController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const tipRouter = express.Router();

tipRouter.post('/',tipController.addTipData);
tipRouter.get('/notAccepted',tipController.findNonAcceptedTips);
tipRouter.get('/accepted',tipController.findTipDataAccepted);
tipRouter.get('/random',tipController.getRandomTip);
tipRouter.put('/:tipId', tipController.changeTipStatus);
tipRouter.delete('/:tipId',tipController.removeTip);

module.exports = tipRouter;
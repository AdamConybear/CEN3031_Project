const userController = require("../controllers/userInfoController");
const express = require("express");; //refers to Express the middleware helper for Node.js
const userRouter = express.Router();

userRouter.post('/user',userController.addUser);
userRouter.get('/user',userController.getUser);
userRouter.get('/assignment', userController.getUserAssignmentData);
userRouter.get('/popup', userController.getUserPopupData);
userRouter.post('/popup', userController.addPopupData);
userRouter.post('/assignment', userController.addAssignmentData);

userRouter.get('/indivAssignment', userController.getIndividualAssignment);
userRouter.get('/allAssignments', userController.getAssignmentFromAllUsers);
userRouter.get('/dayAssignments', userController.getUserAssignmentsOnDay);

userRouter.put('/assignmentRated', userController.updateAssignment);



module.exports = userRouter;

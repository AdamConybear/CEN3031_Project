// import Popup from "../models/popupModel.js";
const Comment = require("../models/commentModel").Item;

const addCommentData = async(req,res) => {
    const comment = req.body;
    if (!comment) {
      return res.status(200).send({
        error: "Comment data not found",
      });
    }
    await new Comment(comment).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
}
const findCommentData = async(req,res) => {
  await Comment.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
}

module.exports = {
    addCommentData: addCommentData,
    findCommentData: findCommentData
}
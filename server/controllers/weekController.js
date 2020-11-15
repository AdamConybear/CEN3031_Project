const Assignment = require("../models/weekModel").Item;

const addAssignmentData = async(req,res) => {
    const assignment = req.body;
    if (!assignment) {
      return res.status(200).send({
        error: "Popup data not found",
      });
    }
    await new Assignment(assignment).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
}





module.exports = {
    addAssignmentData: addAssignmentData,
}
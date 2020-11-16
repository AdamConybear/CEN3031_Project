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

const getDataFromAssignment = async(req,res) => {
  const _assignment = req.query.assignment;

  await Assignment.find({assignment:_assignment})
  .then(a => {
    if (!a) {
      return res.status(200).send({
        error: "Assignment not found with name: " + _assingment,
      });
    }
    res.json(a);
  })
  .catch((err) => {
    res.status(200).send({
      error: err.message || "An unknown error has occurred.",
    });
  });


}




module.exports = {
    addAssignmentData: addAssignmentData,
    getDataFromAssignment:getDataFromAssignment
}
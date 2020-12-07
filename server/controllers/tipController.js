const Tip = require("../models/tipModel").Item;


const addTipData = async(req,res) => {
    const tip = req.body;
    if (!tip) {
      return res.status(200).send({
        error: "Tip data not found",
      });
    }
    await new Tip(tip).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
}

const findTipDataAccepted = async(req,res) => {
  console.log("yo yo");
  await Tip.find({accepted: true}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
}

const findTipDataReviewed = async(req,res) => {
    console.log("yo yo");
    await Tip.find({reviewed: false}, (err, data) => {
      if (err)
        return res.status(200).send({
          message: err.message || "An unknown error occurred",
        });
      res.json(data);
    });
  }

module.exports = {
    findTipDataReviewed: findTipDataReviewed,
    findTipDataAccepted: findTipDataAccepted,
    addTipData: addTipData
}


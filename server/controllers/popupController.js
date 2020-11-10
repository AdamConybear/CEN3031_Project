// import Popup from "../models/popupModel.js";
const Popup = require("../models/popupModel").Item;

const addPopData = async(req,res) => {
    const popup = req.body;
    if (!popup) {
      return res.status(200).send({
        error: "Popup data not found",
      });
    }
    await new Popup(popup).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
}
module.exports = {
    addPopData: addPopData
}
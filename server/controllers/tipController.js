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
  // console.log("yo yo");
  await Tip.find({accepted: true}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
}

const findNonAcceptedTips = async(req,res) => {
    // console.log("yo yo");
    await Tip.find({accepted: false}, (err, data) => {
      if (err)
        return res.status(200).send({
          message: err.message || "An unknown error occurred",
        });
      res.json(data);
    });
}
// const getRandomTip = async(req,res) => {
//   // console.log("yo yo");
//   await Tip.aggregate([{$sample: { size: 1 }}], (err, data) => {
//     if (err)
//       return res.status(200).send({
//         message: err.message || "An unknown error occurred",
//       });
//     res.json(data);
//   });
// }  

const getRandomTip = async(req,res) => {
  // console.log("yo yo");
  await Tip.find({accepted: true}, (err, data) => {
    if (err){
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    }
    
    var item = data[Math.floor(Math.random() * data.length)];

    res.json(item);
  });
}  

const removeTip = async (req, res) => {
  const _id_ = req.params.tipId;

  await Tip.deleteOne({ _id: _id_ }, (err) => {
    if (err) {
      return res.status(200).send({
        error: err.message || "An unknown error occurred",
      });
    }
    res.send({
      message: _id_ + " has been deleted successfully",
    });
  });
};

const changeTipStatus = async(req,res) => {
  // console.log("yo yo");
  // let id = req.query.id;
  const _id_ = req.params.tipId;

  await Tip.findOne({_id: _id_})
    .then(tip => {
        if (!tip) {
            return res.status(200).send({
                error: "No tip with id: " + id,
            });
        }
        //tip is found
       
        tip.accepted = true;
        tip.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(200).send(err);
        }); 

        
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });
}
  
  

module.exports = {
    // findTipDataReviewed: findTipDataReviewed,
    findNonAcceptedTips:findNonAcceptedTips,
    findTipDataAccepted: findTipDataAccepted,
    addTipData: addTipData,
    getRandomTip: getRandomTip,
    changeTipStatus:changeTipStatus,
    removeTip:removeTip
}


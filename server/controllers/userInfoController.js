const User = require("../models/userInfoModel").User;
const Popup = require("../models/userInfoModel").Popup;
const Assignment = require("../models/userInfoModel").Assignment;


const addUser = async(req,res) => {
    const user = req.body;

    if (!user) {
        return res.status(200).send({
            error: "User data not found",
        });
    }
    await new User(user).save()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(200).send(err);
    }); 
}

const getUserPopupData = async(req,res) => {
    const _userId = req.query.id; //in params

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        res.json(user.popup);
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });
}

const getUserAssignmentData = async(req,res) => {
    const _userId = req.query.id;

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        res.json(user.assignments);
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });


    // await User.findOne({id:_userId})
    // .populate('assignments')
    // .exec((err,assignment) => {
    //     if (err) return handleError(err);


    // });

}

// const addPopupData = async(req,res) => {
//     const _userId = req.query.id;
//     const popupData = req.body;

//     await User.findOne({id:_userId})
//     .then(user => {
//         if (!user) {
//             return res.status(200).send({
//                 error: "User not found with id: " + _userId,
//             });
//         }
//         //user is found
//         user.assignments.push(
//             await new Popup(popupData).save()
//             .then((data) => {
//                 res.json(data);
//             })
//             .catch((err) => {
//                 res.status(200).send(err);
//         })); 
//         res.json(user);
        
//     })
//     .catch((err) => {
//         res.status(200).send({
//         error: err.message || "An unknown error has occurred.",
//         });
//     });
// }


// const addAssignmentData = async(req,res) => {
//     const _userId = req.query.id;
//     const assignmentData = req.body;

//     await User.findOne({id:_userId})
//     .then(user => {
//         if (!user) {
//             return res.status(200).send({
//                 error: "User not found with id: " + _userId,
//             });
//         }
//         //user is found
//         await new Assignment(assignmentData).save()
//         .then((data) => {
//             res.json(data);
//         })
//         .catch((err) => {
//             res.status(200).send(err);
//         });
        
//     })
//     .catch((err) => {
//         res.status(200).send({
//         error: err.message || "An unknown error has occurred.",
//         });
//     });
// }


module.exports = {
    addUser: addUser,
    getUserPopupData:getUserPopupData,
    getUserAssignmentData:getUserAssignmentData,
    // addPopupData:addPopupData,
    // addAssignmentData:addAssignmentData
}
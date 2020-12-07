const moment = require("moment");
const User = require("../models/userInfoModel").User;

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
        res.json(user.popups);
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
}

const addPopupData = async(req,res) => {
    const _userId = req.query.id;
    const popupData = req.body;

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found

        user.popups.push(popupData);
        user.save()
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


const addAssignmentData = async(req,res) => {
    const _userId = req.query.id;
    const assignmentData = req.body;
    let count = 0;

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        //check if assignment is already in db
        user.assignments.map((a) => {
            if (a.assignment === assignmentData.assignment){
                count = 1;
                return res.status(200).send({
                    message: "Assingment already in database: " + a.assignment
                });
            }else{
                // user.assignments.push(assignmentData);
            }
        })

        //assingment not in db
        if (count === 0){
            
            user.assignments.push(assignmentData);
            user.save()
            .then((data) => {
                res.json(assignmentData);
            })
            .catch((err) => {
                res.status(200).send(err);
            }); 
        }


        
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });

}

const getIndividualAssignment = async(req,res) => {
    const _userId = req.query.id;
    const _assignment = req.query.assignment;

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        user.assignments.map((a)=>{
            if (a.assignment === _assignment){
                return res.json(a);
            }
        })
        return res.status(200).send({
            error: "No Assignment found with title: " + _assignment,
        });

        
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });
}

const getAssignmentFromAllUsers = async(req,res) => {
    const _assignment = req.query.assignment;

    let assignmentArr = [];

    await User.find({},(err, data) => {
        if (err)
          return res.status(200).send({
            message: err.message || "An unknown error occurred",
          });
        //data is an array of all users
        // res.json(data);


        data.map((user) => {
            user.assignments.map((ua) => {
                if (ua.assignment === _assignment){
                    assignmentArr.push(ua);
                }
            })
        })

        if (assignmentArr.length === 0){
            return res.status(200).send({
                message: "No Assignment found with title: " + _assignment,
            });

        }

        res.json(assignmentArr);
      });
}

const getUserAssignmentsOnDay = async(req,res) => {
    const _userId = req.query.id;
    const _day  = req.query.dueDate;

    let dayArr = [];

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        user.assignments.map((a) => {
            if (moment(a.dueDate).isSame(_day, 'day')){
                dayArr.push(a);
            }
        })

        if (dayArr.length === 0){
            return res.status(200).send({
                message: "No assignments found on day: " + _day,
            });

        }

        res.json(dayArr);
    })
    .catch((err) => {
        res.status(200).send({
        error: err.message || "An unknown error has occurred.",
        });
    });
}

const updateAssignment = async(req,res) => {
    const _userId = req.query.id;
    const ratedData = req.body;
    const _assignment = req.query.assignment;

    await User.findOne({id:_userId})
    .then(user => {
        if (!user) {
            return res.status(200).send({
                error: "User not found with id: " + _userId,
            });
        }
        //user is found
        user.assignments.map((a)=>{
            if (a.assignment === _assignment){
                a.isRated = ratedData.isRated;
                a.hours = ratedData.hours;
                a.difficulty = ratedData.difficulty;
            }
        })

        user.save()
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
    addUser: addUser,
    getUserPopupData:getUserPopupData,
    getUserAssignmentData:getUserAssignmentData,
    addPopupData:addPopupData,
    addAssignmentData:addAssignmentData,
    getIndividualAssignment:getIndividualAssignment,
    getAssignmentFromAllUsers:getAssignmentFromAllUsers,
    getUserAssignmentsOnDay:getUserAssignmentsOnDay,
    updateAssignment:updateAssignment
}
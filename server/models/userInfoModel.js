
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userInfoSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    popups: [{ 
        stress: {
            type: Number,
            required: true
        },
        sleep: {
            type: Number,
            required: true
        },
        exercise: {
            type: Boolean,
            required: true
        }
    }],
    assignments: [{
        assignment: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,
            required: true
        },
        hours: {
            type: Number,
            required: true
        },
        difficulty: {
            type: Number,
            required: true
        },
        isRated:{
            type: Boolean,
            required: true
        }
    }]
    
});
//specifies the collection in the third var
// export default mongoose.model('popups', popupSchema, 'UserPopUps'); 
module.exports = {
    User: mongoose.model('users', userInfoSchema, 'UserInfo'),
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const popupSchema = new Schema ({
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
});

const weekSchema = new Schema ({
    assignment: {
        type: String,
        required: true
    },
    class: {
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
});

// const Popup = mongoose.model('Popup', popupSchema);
// const Assignment = mongoose.model('Assignment', weekSchema);

const userInfoSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    popups: [{ type: Schema.Types.ObjectId, ref: 'Popup'}],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment'}],
    
});
//specifies the collection in the third var
// export default mongoose.model('popups', popupSchema, 'UserPopUps'); 
module.exports = {
    User: mongoose.model('users', userInfoSchema, 'UserInfo'),
    Popup: mongoose.model('Popup', popupSchema),
    Assignment: mongoose.model('Assignment', weekSchema)
}
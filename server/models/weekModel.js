
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create schema
const weekSchema = new Schema ({
    assignment: {
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
//specifies the collection in the third var
// export default mongoose.model('popups', popupSchema, 'UserPopUps'); 
module.exports = {
    Item: mongoose.model('week', weekSchema, 'WeeklyAssignments')
}
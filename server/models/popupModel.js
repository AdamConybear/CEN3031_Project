
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
//specifies the collection in the third var

// module.exports = {
//     Item: mongoose.model('popups', popupSchema, 'UserPopUps')
// }

module.exports = popupSchema;

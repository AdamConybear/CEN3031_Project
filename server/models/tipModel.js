const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create schema
const tipSchema = new Schema ({
    tip: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    },
    reviewed: {
        type: Boolean,
        required: true
    }
});
//specifies the collection in the third var
// export default mongoose.model('popups', popupSchema, 'UserPopUps'); 
module.exports = {
    Item: mongoose.model('tip', tipSchema, 'TipData')
}
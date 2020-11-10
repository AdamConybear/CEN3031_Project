
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create schema
const commentSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    }
});
//specifies the collection in the third var
// export default mongoose.model('popups', popupSchema, 'UserPopUps'); 
module.exports = {
    Item: mongoose.model('comment', commentSchema, 'CommentBoard')
}
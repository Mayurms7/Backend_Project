const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description :
    {
        type : String,
        required : true
    },
    assignedEmployee :
    [{
        type : mongoose.Schema.Types.ObjectID,
        ref : 'Employee'
    }],
    completed :
    {
        type : Boolean,
        default: false
    },
    createdAt : 
    {
        type : Date,
        default : Date.now,
    }
});

const Review = mongoose.Model('Review',reviewSchema);
module.exports = Review;
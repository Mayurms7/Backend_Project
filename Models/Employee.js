const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName :
    {
        type : String,
        required : true
    },
    lastName :
    {
        type: String,
        required : true
    },
    email :
    {
        type : String,
        required : true,
        unique : true
    },
    isAdmin :
    {
        type : Boolean,
        default : false
    },
    password :
    {
        type: String,
        required : true
    }
});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;
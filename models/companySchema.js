
const mongoose = require('mongoose');

const company = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        date: {
          type: Date,
          required: true,
        },
        result: {
          type: String,
          enum: [
            "On Hold",
            "Selected",
            "Pending",
            "Not Selected",
            "Did not Attempt",
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports=mongoose.model('Company',company)

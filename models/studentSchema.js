const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    webD: {
      type: Number,
      required: true,
    },
    dsa: {
      type: Number,
      required: true,
    },
    react: {
      type: Number,
      required: true,
    },
    placement_status: {
      type: String,
      required: true,
      enum: ["Placed", "Not Placed"],
    },
    interviews: [
      {
        company: {
          type: String,
        },
        date: {
          type: String,
        },
        result: {
          type: String,
          renum: [
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

module.exports = mongoose.model('Student', studentSchema);

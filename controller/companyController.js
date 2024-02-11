const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
const Company = require("../models/companySchema");
const { redirect } = require("express/lib/response");
const { Console } = require("console");

module.exports.scheduleInterview = async function (req, res) {
  try {
    const students = await Student.find({});

    let array = [];
    for (let s of students) {
      array.push(s.batch);
    }

    array = [...new Set(array)];

    return res.render("scheduleInterview", { students, array });
  } catch (err) {
    console.log(`Error in Creating User :${error}`);
    return res.redirect("back");
  }
};

module.exports.companyHomePage = async function (req, res) {
  try {
    const students = await Student.find({});
    return res.render("interviewsHomePage", { students });
  } catch (error) {
    console.log("Error in rendering company home page" + error);
    return res.redirect("back");
  }
};

module.exports.allocateStudentForInterview = async function (req, res) {
  const { id, company, date } = req.body;
  console.log(id + " " + company + " " + date);
  try {
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: "Pending",
    };
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      for (let s of existingCompany.students) {
        console.log(s);
        if (s._id === id) {
          console.log(
            "Interview of Student alrady scheduled with this company"
          );
          req.flash(
            "error",
            "Interview of Student already scheduled with this company"
          );
          return res.redirect("back");
        }
      }
    }
    existingCompany.students.push(obj);
    existingCompany.save();
    const student = await Student.findById(id);
    if (student) {
      const interview = {
        company,
        date,
        result: "Pending",
      };
      student.interviews.push(interview);
      student.save();
    }
    req.flash("success", "Interview Scheduled Sucessfully");
    console.log("Scheduled");
    return res.redirect("/company/interviewslist");
  } catch (err) {
    console.log("Error in scheduling interview" + err);
    return res.redirect("back");
  }
};

module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;

  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for(let company of student.interviews){
        if(company.company===companyName)
        {
          company.result=companyResult;
          break;
        }
      }
      await student.save();
    }
    const company=await Company.findOne({name: companyName});
    if(company)
    {
      for(let std of company.students)
      {
        if(std.student.toString()===id)
        {
          std.result=companyResult;
          await company.save();
        }
      }
    }
    console.log('Interview status changes successfully');
    req.flash("success", "Interview Status Changed Sucessfully");
    return res.redirect("back");
  } catch (error) {
    console.log("Error in changing status of interview" + err);
    res.redirect("back");
  }
};

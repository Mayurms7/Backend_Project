const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
const Company = require("../models/companySchema");
const {Parser} = require('json2csv');
const fs = require('fs');

module.exports.signUp = function (req, res) {
  res.render("signUp");
};
module.exports.SignInPage = async function (req, res) {
  return res.render("signIn", {
    title: "SignIn",
    sucess: "sucess",
  });
};
module.exports.signIn = async function (req, res) {
  try {
    const Students = await Student.find({});
    return res.render("home", { Students });
  } catch (error) {
    return res.send("<h1>Error in SignIn</h1>");
  }
};

module.exports.createUser = async function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    console.log(password + " " + confirmPassword);
    if (password !== confirmPassword) {
      req.flash("error", "Password is not matching");
      return res.redirect("back");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      req.flash("error", "Email Already Exist");
      return res.redirect("back");
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(`Error in Creating User :${error}`);
    res.redirect("/");
  }
};

//sign in and create session
module.exports.createSession = async function (req, res) {
  return res.redirect("/home");
};

module.exports.addStudent = async function (req, res) {
  return res.render("addStudent");
};

module.exports.createStudent = async function (req, res) {
  const {
    batch,
    name,
    email,
    phone_no,
    college,
    placement_status,
    dsa,
    webD,
    react,
  } = req.body;
  try {
    const studentExist = await Student.findOne({ email });
    if (studentExist) {
      req.flash("error", "Email Already Exist");
      return res.redirect("back");
    }
    const newStudent = await Student.create({
      batch,
      name,
      email,
      phone_no,
      college,
      placement_status,
      dsa,
      webD,
      react,
    });
    await newStudent.save();
    req.flash("success", "Student Added Sucessfully");
    res.redirect("/home");
  } catch (error) {
    console.log("error in cretaing student :" + error);
    res.redirect("/addStudent");
  }
};

module.exports.deleteStudent = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const student = await Student.findById(id);

      if (student && student.interviews.length > 0) {
        for (let interview of student.interviews) {
          const company = await Company.findOne({ name: interview.company });
          if (company) {
            for (let i = 0; i < company.students.length; i++) {
              if (company.students[i].student.toString() == id) {
                company.students.splice(i, 1);
                company.save();
                break;
              }
            }
          }
        }
      }
      await Student.findByIdAndDelete(id);
      req.flash("success", "Student deleted Sucessfully");
      res.redirect("back");
    } catch (error) {
      console.log("error in cretaing student :" + error);
      req.flash("error", "Error in deleting student");
      return res.redirect("back");
    }
  }
};
module.exports.csvReportDownload = async function (req,res) {
  try {
    const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.college +
				',' +
				student.phone_no +
				',' +
				student.batch +
				',' +
				student.dsa +
				',' +
				student.webD +
				',' +
				student.react;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
				}
			}
			no++;
			csv += '\n' + data;
		}

		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
      req.flash("success", "Report generated successfully");
			return res.download('report/data.csv');
		});
  } catch (error) {
  console.log("Error in generating report" + error);
  return res.redirect("back");
  }
};



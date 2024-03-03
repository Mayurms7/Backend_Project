const bcrypt = require('bcrypt');
const Employee = require('../Models/Employee');

const authConrtoller =
{
    userRegister : async (req, res) =>{
        try
        {
            const {firstName, lastName,email,password} = req.body;
            // check if email/user already exists
            const existingUser = await Employee.findOne({email});
            if(existingUser)
            {
                return res.status(400).json({message : 'Email already registered'});
            }

            const hashPassword = await bcrypt.hash(password,10);

            const newUser = new Employee ({
                firstName,
                lastName,
                email,
                password : hashPassword
            });
            await newUser.save();

            //const token = generateToken(newUser);

           return res.status(201).json({message : 'User Registered Sucessfully'});
        }catch(error)
        {
            console.log(error);
           return res.status(500).json({message : 'Error in registering User'});
        }
    },

    login : async (req,res) =>{
        const {email,password}=req.body;
        const employee = await Employee.findOne({email});
        if(!employee)
        {
            return res.status(401).json({messsage:'User Not Found'});
        }
        const passwordCheck = await bcrypt.compare(password, employee.password);
        if(!passwordCheck)
        {
            return res.status(401).json({message:'Invalid Password'});
        }

        return res.status(200).json({message :'Sign In sucessfully.'})


    }
}

module.exports = authConrtoller;
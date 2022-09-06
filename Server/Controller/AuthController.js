import User from '../Model/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  validator  from 'validator';


// registerUser new user
export const registerUser = async(req, res)=>{
   const {email, password, firstname, lastname, confirmpassword} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const username= `@${firstname.toLowerCase()}_${Math.floor(Math.random() * 10000) + 1000}`
    const newUser = new User({email, password:hashedPass, firstname, lastname, username})
    try{
        if(validator.isLength(firstname && lastname,{min:3})){
            if(validator.isStrongPassword(password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              }))
                if(password === confirmpassword){
                    if (await User.findOne({$or: [{email}, {username}]})) {
                        res.status(400).json({message: "User already exists"})
                    }
                    else{
                        const user = await newUser.save();
                        const token = jwt.sign({username:user.username,_id: user._id}, process.env.JWT_SECRET, {expiresIn: '12h'});
                        res.status(200).json({message: "User created successfully",user:user,token:token});
                    }
                }else{
                    return res.status(400).json({message: 'Password is not same.'})
                }
            else{
                return res.status(400).json({message: 'Password must be 8 characters, including ([a-z],[A-Z],[0-9],[~, !, @, #, $, %, &])'})
            }
        }else{
            return res.status(400).json({message: ' all fields are required.'})
        }
        }catch(err){
        res.status(500).json({message: err.message})
    }
}

// login user
export const loginUser = async(req, res)=>{
    const {email, password, username} = req.body;
    
    try {
        const user = await User.findOne({$or: [{email}, {username}]})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                const token = jwt.sign({username:user.username,_id: user._id}, process.env.JWT_SECRET, {expiresIn: '12h'});
                res.status(200).json({message:"Login Successfully ",user:user,token:token})
            } else {
                res.status(401).json({message: "Invalid password"})
            }
        }
        else{ res.status(404).json({message:"User not found"})}
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
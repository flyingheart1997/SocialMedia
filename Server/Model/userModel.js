import mongoose from "mongoose";
import  validator  from 'validator';
import validators from 'mongoose-validators';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [
            {validator: validator.isEmail, msg: 'Invalid email'},
        ]
    },
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isLive: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    about: {
        type: String,
        default: '',
    },
    relationShip: {
        type: String,
        default: '',
    },
    worksAt: {
        type: String,
        default: '',
    },
    livesIn: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
    twitter: {
        type: String,
        default: '',
    },
    follower: [],
    following: [],
    

}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User;
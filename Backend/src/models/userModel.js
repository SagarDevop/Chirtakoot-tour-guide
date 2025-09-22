import { hash } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
           validate: {
      validator: function (value) {
        return /@gmail\.com$/.test(value);
      },
      message: 'Email must end with @gmail.com',
     },
    },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
                type: String,
                default: null   
            },
        
    },
    { timestamps: true } 
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await hash(this.password, 10)
}),

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
    
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        id: this._id,
        email: this.email,
        name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);



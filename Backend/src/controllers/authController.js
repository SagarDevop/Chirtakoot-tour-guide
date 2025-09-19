import {User} from "../models/userModel.js";
import bcrypt from "bcrypt";
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'
import {ApiResponse} from '../utils/ApiResponse.js'

const generateAccessAndRefreshToken = async(userID) => {
   const user =await User.findById(userID)
   const accessToken = user.generateAccessToken()
   const refreshToken = user.generateRefreshToken()

   user.refreshToken = refreshToken
   user.save({validateBeforesave: false})

   return {accessToken, refreshToken}
}

export const signin = async (req, res) => {
    try {

        const {email, name, password} = req.body;
        if(!email || !name || !password){
            throw new ApiError(
                410,
                "all field are required"
            )
        }
        const exitingUser =  await User.findOne({email})
        if(exitingUser){
            throw new ApiError(
                400,
                "user already exisits"
            )
        }
        const user = await User.create({
            name,
            email,
            password
        })

        
        const responseUser = await User.findById(user._id).select("-password -refreshToken -_id -createdAt -updatedAt")

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "user register successfully",
                responseUser
            )
        )
        
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong in server",error
        )
        
    }   
}

export const login = async(req, res) =>{
   try {
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(
            401,
            "All Fields are required"
        )
    }

    const exitingUser = await User.findOne({email})

    if(!exitingUser){
        throw new ApiError(
            402,
            "user does not exists"
        )
    }

    const validatePassword =await exitingUser.isCorrectPassword(password)

    if(!validatePassword){
        throw new ApiError(
            401,
            "your password is invalid"
        )
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(exitingUser._id)

    const responseUser = await User.findById(exitingUser._id).select("-password -_id -createdAt -updatedAt")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            "login succesfully",
            responseUser
        )
    )


    
   } catch (error) {
    throw new ApiError(
        200,
        "somtheing went wrong during login",
        error
    )
    
   }

}

export const logout = async(req, res) =>{
    
try {
        const options = {
       httpOnly: true,
       secure: true,
       sameSite: "None", 
     }
    
      return res
     .status(200)
     .clearCookie("refreshToken", options)
     .clearCookie("accessToken", options)
     .json(
        new ApiResponse(201,{}, "New user logout successfully ")
     )
} catch (error) {
    new ApiError(
        500,
        "intrenal issue",
        error
    )
    
}
 
}

export const refreshAccessToken = async(req, res) =>{
try {
        const inncomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if(!inncomingRefreshToken){
            throw new ApiError(
                401,
                "there is no incomingtoken here!"
            )
        }
        const decodeToken = jwt.verify(inncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        if(!decodeToken){
            throw new ApiError(
                501,
                "unable decode the token we are getting"
            )
        }
    
        const user = await User.findById(decodeToken._id)
        if(!user){
            throw new ApiError(
                503,
                "unable to find the user by ID"
            )
        }
    
        if(inncomingRefreshToken !== user.refreshToken){
        throw new ApiError(402, "token are not matchhed ")
     }
    
     const options = {
        httpOnly: true,
        secure: true
     }
    
     const {accessToken, newrefreshToken} = generateAccessAndRefreshToken(user._id)
    
     return res
     .status(200)
     .cookie("accessToken", accessToken)
     .cookie("refreshToken", newrefreshToken)
     .json(
        new ApiError(
            200,
            {newrefreshToken, accessToken},
            "access tokken refreshed"
        )
     )
} catch (error) {
    new ApiError(
        200,
        "some internal server issue",
        error

    )
    
}
}
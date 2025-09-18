import User from "../models/userModel.js";
import bcrypt from "bcrypt";


export const signin = async (req, res) => {
    try {
        const {email, password, name } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message: "user alreay exit"})
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email, 
            password: hashpassword 
        })

        await newUser.save()
       res.status(201).json({ 
  message: 'User created successfully', 
  user: {
    name: newUser.name,
    email: newUser.email,
    _id: newUser._id
  }
});
        
    } catch (error) {
        console.error("Error in signin controller", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({message: "Invalid cread."})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            res.status(400).json({message: "Invalid Cred."})
        }
        res.status(200).json({
  message: 'Login successful',
  user: {
    name: user.name,   // ✅ Include name
    email: user.email,
    _id: user._id
  }
});
        
    } catch (error) {
        console.error("error to login",error)
        res.status(500).json({message: "intrenal server error to login"})
        
    }

}
import mongoose from "mongoose";

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
        
    },
    { timestamps: true } 
);

const User = mongoose.model('User', userSchema);

export default User;

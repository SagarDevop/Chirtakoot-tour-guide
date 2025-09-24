import { Booking } from "../models/bookingModel.js";
import { ApiError } from "../utils/ApiError.js";

export const bookingform = async(req, res) =>{
    try {
        const {phone, from, to, passengers} = req.body;
        if(!phone || !from || !to || !passengers){
            return res
            .status(400)
            .json({
            success: false,
            statusCode: 400,
            message: "All fields are required",
            data: null,
            errors: [],
            })
        }
    
        const booking = await Booking.create({
            phone, 
            from,
            to,
            passengers,
            booker: req.user._id
        })
    
        return res
        .status(200)
        .json({
            success: true,
            statusCode: 200,
            message: "your booking is register",
            data: booking
    
        })
    } catch (error) {
        throw new ApiError(
                    500,
                    "something went wrong in server",error
                )
        
    }



}
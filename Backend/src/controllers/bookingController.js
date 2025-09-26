import { Booking } from "../models/bookingModel.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendEmail.js";

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

         await sendEmail(
      req.user.email,
      "Your Booking Confirmation - Chitrakoot Yatra",
      `
        <h2>Booking Confirmed ✅</h2>
        <p>Hi ${req.user.name},</p>
        <p>Your booking has been successfully registered.</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p>Phone: ${phone}</p>
        <br/>
        <p>🙏 Thank you for choosing Chitrakoot Yatra</p>
      `
    );

    
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Booking Received - Chitrakoot Yatra",
      `
        <h2>New Booking Alert 🚖</h2>
        <p>A new booking has been made:</p>
        <p><strong>User:</strong> ${req.user.name} (${req.user.email})</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p>Phone: ${phone}</p>
      `
    );

    
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
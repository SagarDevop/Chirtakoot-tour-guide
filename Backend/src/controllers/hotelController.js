import { Hotels } from "../models/hotelModel.js";

export const addhotel = async(req, res) =>{
    try {
        const {name, location, priceRange, rating, contact, images, latitude, longitude, amenities,  mapLink, mapLocation} = req.body;
    
        if(!name || !location || !priceRange || !rating || !contact || !images || !mapLink || !latitude || !longitude || !amenities || !mapLocation){
            return res
            .status(401)
            .json({
                success: false,
                statusCode: 400,
                message: "All fields are required",
                data: null,
                errors: [],
            })
        }
        const hotel = await Hotels.create({
            name,
            location,
            priceRange,
            rating,
            contact,
            images,
            longitude,
            latitude,
            amenities,
            mapLink,
            mapLocation
        })
    
        return res
            .status(200)
            .json({
                success: true,
                statusCode: 200,
                message: "your hotels saved",
                data: hotel
        
            })
    } catch (error) {
        return res
        .status(501)
        .json({
            success: false,
            statusCode: 501,
            message: "internal issue",
            data: null,
            error: error
        })
        
    }



}

export const gethotels = async(req, res) =>{
    try {
        const hotels = await Hotels.find()
        return res
        .status(200)
        .json({
            success: true,
            data: hotels
        })
    } catch (error) {
        return res
        .status(500)
        .json({
            success: false,
            statusCode: 501,
            message: "iternal issue",
            data: null,
            error: error
        })
        
    }
}
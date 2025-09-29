import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    priceRange: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    contact: {
      type: String,
    },
    images: [String],

    latitude: { 
      type: Number, 
      required: true
     },
     amenities: {
      type: [String]
     },
    longitude: { 
      type: Number, 
      required: true 
    },

    mapLink: {
      type: String,
    },
    
    mapLocation : {
      type: String
    }
  },
  { timestamps: true }
);

export const Hotels = mongoose.model("Hotels", hotelSchema);

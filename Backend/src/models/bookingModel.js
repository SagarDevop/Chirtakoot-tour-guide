import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    },
    passengers: {
      type: Number,
      required: true,
      min: 1
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);

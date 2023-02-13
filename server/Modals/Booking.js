const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    sdate: {
      type: String,
      required: true,
    },
    edate: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const aboutus = mongoose.model("bookings", BookingSchema);

module.exports = aboutus;

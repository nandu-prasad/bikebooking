const router = require("express").Router();
const Booking = require("../Modals/Booking");

//booking a bike
router.post("/booking", async (req, res) => {
  const { sdate, edate, customer } = req.body;
  if (!sdate || !edate || !customer) {
    return res.status(422).json({ error: "These feilds are mandatory" });
  }
  try {
    const overlappingBookings = await Booking.find({
      $and: [{ edate: { $gt: sdate } }, { sdate: { $lt: edate } }],
    });
    if (overlappingBookings.length > 0) {
      return res.status(422).json({ error: "slot already taken" });
    }
    const newBooking = new Booking({ sdate, edate, customer });
    await newBooking.save();
    res.status(201).json("Booking successfully added");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

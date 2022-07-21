const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors, handleInsertSpots } = require("../../utils/validation");


router.get('/me', requireAuth, async(req, res) => {

  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
      },
    ],
  });

  return res.status(200).json(bookings);

})




module.exports = router

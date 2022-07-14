const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User } = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  handleInsertSpots,
} = require("../../utils/validation");


// ? ask questions about this one
router.get("/me", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({ where: { userId: req.user.id} })

  if(!reviews){
    return res.status(404).json({message: "no reviews were found"})
  }

  const ReviewArray = []

  const user = await User.findOne({
      where: {
         id: req.user.id,
       },
     });

  reviews.forEach(async (review)  => {

    const spot = await Spot.findOne({
      where: {
        id: review.dataValues.spotId
      }
    })


    const obj = {
      id: review.dataValues.id,
      userId: review.dataValues.userId,
      spotId: review.dataValues.spotId,
      review: review.dataValues.review,
      stars: review.dataValues.stars,
      createdAt: review.dataValues.createdAt,
      updatedAt: review.dataValues.updatedAt,
      User: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.LastName
      },
      Spot: {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        price: spot.price
      }

    }
    ReviewArray.push(obj);
  })



  return res.status(200).json({ReviewArray});

})

router.delete("/:reviewId", (req, res) => {
  try {
  } catch {
    // if cannot be found throw error with
    // res.statusCode = 404
    // res.json({
    //  "message": "Review couldn't be found",
    //    "statusCode" : "404"
    // })
  }
});

module.exports = router;

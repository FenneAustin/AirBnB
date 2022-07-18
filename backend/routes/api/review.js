const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User } = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  handleInsertSpots,
} = require("../../utils/validation");


const validateReviewInsert = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isString()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// ? ask questions about this one
router.get("/me", requireAuth, async (req, res) => {
  const reviewsData = await Review.findAll({ where: { userId: req.user.id} })

  if(!reviewsData){
    return res.status(404).json({message: "no reviews were found"})
  }

  const Reviews = []

  const user = await User.findOne({
      where: {
         id: req.user.id,
       },
     });
  for(const review of reviewsData){

    const spot = await Spot.findOne({
      where: {
        id: review.dataValues.spotId
      }
    })

    const image = await Image.findAll({
      where: {
        imageableId: review.dataValues.id,
        imageableType: "review"
      }
    })

    let ImageArr = [];
    image.forEach((image) => {
          ImageArr.push(image.url);
    });

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
      },
      images: ImageArr

    }
    Reviews.push(obj);
  }



  return res.status(200).json({Reviews});

})

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByPk(id);

  if (!review) {
    return res.status(404).json({message: "Review couldn't be found", statusCode: 404});
  }

  if (review.userId !== req.user.id){
    return res.status(403).json({message: "must have proper authentication", statusCode: 403})
  }

  await review.destroy();

  return res.status(200).json({message: "successfully deleted", statusCode: 200})

});

router.put("/:reviewId", requireAuth, validateReviewInsert, async (req, res) => {
  const { id } = req.params;
  const { review, stars } = req.body;

  const prevReview = await Review.findByPk(id);

  if (!prevReview){
    return res.status(404).json({message: "Review couldn't be found", statusCode: 404})
  }

  if (prevReview.userId !== req.user.id){
    return res.status(403).json({message: "Proper authentication is required"})
  }

  prevReview.set({review: review, stars: stars})
  await prevReview.save()


  return res.status(200).json(prevReview);

})

module.exports = router;

const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User } = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  handleInsertSpots,
} = require("../../utils/validation");

// TODO: add more checks to make sure input is validated

const validateSpotInsert = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isString()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isCurrency()
    .withMessage("Price per day is required"),
  handleInsertSpots,
];

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: {
      model: Image,
      as: "previewImage",
      attributes: ["url"],
    },
  });
  return res.json(spots);
});

router.post("/", requireAuth, validateSpotInsert, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let returnObj;

  try {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });
    returnObj = newSpot;
  } catch {
    return res.status(400).json({ error: "Error creating spot" });
  }
  return res.json(returnObj);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let spot;
  // TODO: does the returned image need to be flattened in the response? same with the numreviews and avg starRating
  try {
    spot = await Spot.findOne({
      where: { id: id, },
      include: {
        model: Image,
        as: "previewImage",
        attributes: ["url"],
      },});
  } catch (err) {
    console.error(err);
  }
  if (!spot) {return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });}

  const numReviews = await Review.count({ where: { userId: id, }});
  const avgStarRating = await Review.findAll({ where: { userId: id}});
  const user = await User.findOne({where: {id: spot.ownerId,},attributes: ["id", "firstName", "lastName"],});

  let total = 0;
  avgStarRating.forEach((review) => {
    total += review.stars;
  });

  const avg = total / avgStarRating.length;

  return res.json({spot, numReviews, avgStarRating: avg, user,});
});

module.exports = router;

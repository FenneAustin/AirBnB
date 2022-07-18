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

const validateReviewInsert = [
  check("review").isString().withMessage("Review is required"),
  check("stars").exists().withMessage("Stars is required"),
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

router.get("/me", requireAuth, async (req, res) => {
  const ownedSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  if (!ownedSpots) {
    return res
      .status(404)
      .json({ message: "couldnt find any spots owned by you" });
  }

  return res.status(200).json(ownedSpots);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let spot;
  // TODO: come back and remove some of the queries and just include the model
  try {
    spot = await Spot.findOne({
      where: { id: id },
      include: {
        model: Image,
        as: "previewImage",
        attributes: ["url"],
      },
    });
  } catch (err) {
    console.error(err);
  }
  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const numReviews = await Review.count({ where: { spotId: id } });
  const avgStarRating = await Review.findAll({ where: { spotId: id } });
  const user = await User.findOne({
    where: { id: spot.ownerId },
    attributes: ["id", "firstName", "lastName"],
  });

  let total = 0;
  avgStarRating.forEach((review) => {
    total += review.stars;
  });

  const avg = total / avgStarRating.length;

  const returnObj = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReview: numReviews,
    avgStarRating: avg,
    images: [],
    Owner: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };

  spot.previewImage.forEach((obj) => {
    let url = obj["url"];
    returnObj.images.push(url);
  });

  return res.json(returnObj);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  if (spot.ownerId == req.user.id) {
    await spot.destroy();
  } else {
    return res
      .status(403)
      .json({ message: "User is not the owner of this spot", statusCode: 403 });
  }
  return res
    .status(200)
    .json({ message: "Successfully deleted", statusCode: "200" });
});

// TODO: does this have to be able to handle single inserts? currently it willl only work if everything is included
router.put("/:id", validateSpotInsert, requireAuth, async (req, res) => {
  const { id } = req.params;

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(id);

  if (!spot) {
    return res.status(404).json({ message: "Spot not found", statusCode: 404 });
  }

  if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "not authorized", statusCode: 403 });
  }

  if (address) {
    spot.set({ address: address });
  }
  if (city) {
    spot.set({ city: city });
  }
  if (state) {
    spot.set({ state: state });
  }
  if (country) {
    spot.set({ country: country });
  }
  if (lat) {
    spot.set({ lat: lat });
  }
  if (lng) {
    spot.set({ lng: lng });
  }
  if (name) {
    spot.set({ name: name });
  }
  if (description) {
    spot.set({ description: description });
  }
  if (price) {
    spot.set({ price: price });
  }
  await spot.save();

  return res.status(200).json(spot);
});

router.get("/:id/reviews", async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.id,
    },
    include: {
      model: Image,
    },
  });

  const spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  if (!reviews) {
    return res.status(200).json([]);
  }

  let obj = [];

  //this break when I add await user
  for (const review of reviews) {
    const user = await User.findByPk(review.userId);

    let ImageArr = [];
    review.Images.forEach((image) => {
      ImageArr.push(image.url);
    });
    obj.push({
      id: review.id,
      userId: review.id,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      Image: ImageArr,
    });
  }

  return res.status(200).json(obj);
});

router.post("/:id/images", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  const spot = await Spot.findByPk(id);

  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  if (spot.ownerId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Must be owner to add image", statusCode: 403 });
  }

  const newImage = await Image.create({
    imageableId: id,
    imageableType: "spot",
    url: url,
  });

  const imageResult = {
    id: newImage.id,
    imageableId: newImage.imageableId,
    imageableType: newImage.imageableType,
    url: newImage.url,
  };

  return res.status(200).json(imageResult);
});

router.post("/:id/reviews", requireAuth, validateReviewInsert, async (req, res) => {
  const { id } = req.params;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(id);

  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const reviewExist = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: id,
    },
  });

  if (!reviewExist) {
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: id,
      review: review,
      stars: stars,
    });
    return res.status(200).json(newReview);
  }

  return res.status(403).json({ message: "review already exists", statusCode: 403});
});

module.exports = router;

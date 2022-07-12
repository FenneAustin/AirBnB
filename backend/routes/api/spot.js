const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review  } = require('../../db/models');

router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
      include:
        {
          model: Image,
          as: "previewImage",
          attributes: ["url"],
        },
    });
    return res.json(spots);
});

router.post('/', requireAuth, async (req,res) => {
  const { address, city, state, country, lat, lng, name, description, price} = req.body;

  let returnObj;

  try{
    const newSpot = await Spot.create({
      userId: req.user.id,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    })
    returnObj = newSpot;
  }
  catch{
    return res.status(400).json({ error: "Error creating spot" });
  }
  return res.json(returnObj);
})

router.get('/:id', async (req, res) => {

  const {id} = req.params;
  let spot;

  try {
  spot = await Spot.findByPk(id);
  } catch(err) {
    console.error(err)
  }
  if (!spot){
    return res.status(404).json({ error: "Not found" });
  }
  const numReviews = await Review.count({
    where: {
      userId: id
    }
  })

  const avgStarRating = await Review.findAll({
    where: {
      userId: id
    }
  })

let total = 0;
avgStarRating.forEach((review) => {
  total += review.stars;
});

const avg = total/ avgStarRating.length;


  return res.json({
    spot,
    numReviews,
    avgStarRating: avg});

})


module.exports = router;

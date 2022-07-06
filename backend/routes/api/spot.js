const express = require("express");

const router = express.Router();
const { requireAuth } = require('../../utils/auth');
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
  // TODO does this have to be in a JWT? or can it be in the req body
  try{
    const newSpot = await Spot.create({

    })
  }
  catch{

  }
})

router.get('/:id', async (req, res) => {

  const {id} = req.params.id;
  try {
  const spot = await Spot.findByPk(req.params.id);
  } catch {
    return res.status(404).json({ error: "Not found" });
  }
  const numReviews = await Review.count({
    where: {
      userId: id
    }
  })

  const avgStarRating = await Review.avg(stars, {
    where: {
      userId: id
    }
  })

  return res.json(spot, numReviews,avgStarRating);

})


module.exports = router;

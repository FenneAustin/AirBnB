const express = require("express");

const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Spot, Image  } = require('../../db/models');

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


module.exports = router;

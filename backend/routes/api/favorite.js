const express = require("express");


const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User, Booking, Favorite } = require("../../db/models");
const { check } = require("express-validator");

router.post(
    "/",
    requireAuth,
    async (req, res) => {
        const { spotId } = req.body;
        const userId = req.user.id;
        const favorite = await Favorite.create({
            userId,
            spotId,
        });
        return res.json({ favorite });
    }
);

router.delete(
    "/:id",
    requireAuth,
    async (req, res) => {
        const { id } = req.params;
        const favorite = await Favorite.findByPk(id);
        await favorite.destroy();
        return res.json({ favorite });
    }
);

router.get(
    "/",
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const favorites = await Favorite.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: Spot,
                    attributes: { exclude: ["description"] },
                },
            ],
        });
        return res.json({ favorites });
    }
);


//
module.exports = router;

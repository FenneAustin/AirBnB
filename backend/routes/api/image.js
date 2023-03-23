const express = require('express');

const router = express.Router();
const {requireAuth, restoreUser} = require('../../utils/auth');
const { Spot, Image, Review, User, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors, handleInsertSpots } = require("../../utils/validation");
const imageDownloader = require('image-downloader')
const { singlePublicFileUpload } = require('../../awsS3');



router.post('/upload-photo-by-link/', requireAuth, async (req, res) => {
    const { link } = req.body;
    const image = await Image.create({
        imageableType: "spot",
        url: link,
    });
    return res.json(image);
});


// make a photo upload route where the form is a file
router.post('/upload-photo/', requireAuth, async (req, res) => {
    const { file } = req;

    // upload to aws s3
    const fileUrl = await singlePublicFileUpload(file);
    const image = await Image.create({
        imageableType: "spot",
        url: fileUrl,
    });
    // TODO: test this feature and make sure it works

    return res.json(image);
});



module.exports = router

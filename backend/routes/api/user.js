const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Image, Review, Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("firstName")
    .exists(),
  check("lastName")
    .exists(),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
// TODO: ask baylen if I can keep this endpoint as including a username and update readme. My readme doesnt have the username but its easier if I just include it

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;

  const checkUser = await User.findOne({where : {
    email: email
  }})

  if(checkUser){
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        "email": "User with that email already exists"
      }
    })
  }


  const user = await User.signup({ email, username, password, firstName, lastName });

  await setTokenCookie(res, user);

  return res.json(
    user.loginSafeObject()
  );
});

router.delete("/Me/images/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  let imageSource;

  const image = await Image.findOne({ where: { id: id } });

  if (!image) {
    return res
      .status(404)
      .json({ message: "Image couldn't be found", statusCode: 404 });
  }

//find the spot or review

  if (image.imageableType == "spot") {
    imageSource = await Spot.findOne( {
      where: { id: image.imageableId}});
  } else if (image.imageableType == "review") {
    imageSource = await Review.findOne( { where: { id: image.imageableId}});
  }

  if (imageSource.ownerId == req.user.id) {
    await image.destroy();
  }
  else if (imageSource.userId == req.user.id) {
    await image.destroy();
  }
  else {
    return res.status(403).json({ message: "Unauthorized", statusCode: 403 });
  }

  return res
    .status(200)
    .json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;

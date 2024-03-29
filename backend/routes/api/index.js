const router = require("express").Router();
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");
const sessionRouter = require("./session");
const usersRouter = require("./user");
const spotsRouter = require('./spot');
const reviewsRouter = require('./review');
const bookingsRouter = require('./booking')
const favoritesRouter = require('./favorite')
const imagesRouter = require('./image')

router.use(restoreUser); //<---- ME FIRST

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/favorites', favoritesRouter);

router.use('/images', imagesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});


// GET /api/set-token-cookie
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});


router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;

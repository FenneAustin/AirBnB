const express = require("express");

const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review, User } = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  handleInsertSpots,
} = require("../../utils/validation");







module.exports = router

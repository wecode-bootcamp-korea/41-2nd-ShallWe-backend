const express = require("express");
const validateToken = require("../middlewares/auth");
const pickController = require("../controllers/pickController");

const router = express.Router();

router.get("", validateToken, pickController.getPick);
router.post("", validateToken, pickController.postPick);
router.patch("", validateToken, pickController.updatePick);
router.delete("/:id", validateToken, pickController.deletePick);
module.exports = { router };

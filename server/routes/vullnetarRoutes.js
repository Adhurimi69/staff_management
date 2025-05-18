const express = require("express");
const router = express.Router();
const vullnetarController = require("../controllers/vullnetarController");

router.post("/", vullnetarController.createVullnetar);
router.get("/", vullnetarController.getAllVullnetare);
router.get("/:id", vullnetarController.getVullnetarById);
router.put("/:id", vullnetarController.updateVullnetar);
router.delete("/:id", vullnetarController.deleteVullnetar);

module.exports = router;

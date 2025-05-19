const express = require("express");

const router = express.Router();

const desiminatorController = require("../controllers/desiminatorController");

router.post("/", desiminatorController.createDesiminator);

router.get("/", desiminatorController.getAllDesiminators);

router.get("/:id", desiminatorController.getDesiminatorById);

router.put("/:id", desiminatorController.updateDesiminator);

router.delete("/:id", desiminatorController.deleteDesiminator);

module.exports = router;

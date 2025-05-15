const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

router.post("/", mentorController.createMentor);
router.get("/", mentorController.getAllMentors);
router.get("/:id", mentorController.getMentorById);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;

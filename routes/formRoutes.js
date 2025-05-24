const express = require("express");
const router = express.Router();
const {
    submitForm,
    getAllResponses,
} = require("../controllers/formController");

router.post("/", submitForm);

// 🔍 Nouvelle route GET
router.get("/", getAllResponses);
router.get("/all", getAllResponses);

module.exports = router;

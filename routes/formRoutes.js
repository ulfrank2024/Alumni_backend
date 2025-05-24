const express = require("express");
const router = express.Router();
const {
    submitForm,
    getAllResponses,
} = require("../controllers/formController");

router.post("/", submitForm);

// 🔍 Nouvelle route GET
router.get("/", getAllResponses);

module.exports = router;

const express = require("express");
const router = express.Router();
const { submitForm } = require("../controllers/formController");

router.post("/", submitForm);

module.exports = router;

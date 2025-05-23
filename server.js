const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");

app.use("/api/form", formRoutes);
app.get("/admin", (req, res) => {
    // res.render("admin"); // Vue à créer
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

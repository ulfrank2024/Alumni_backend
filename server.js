const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");

dotenv.config();

const app = express();

const allowedOrigins = ["https://ulfrank2024.github.io"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/form", formRoutes);
app.get("/admin", (req, res) => {
    // res.render("admin");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

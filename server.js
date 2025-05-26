const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");
const { fetch } = require("undici");

dotenv.config();

const app = express();
const allowedOrigins = [
    "https://ulfrank2024.github.io",
    "https://sjd-alumni.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS non autorisé pour cette origine."));
            }
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: false,
    })
);

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/form", formRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend de SJD Alumni");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

setInterval(async () => {
    try {
        const res = await fetch("https://alumni-backend-wmj4.onrender.com/");
        console.log("🔁 Ping envoyé à Render", new Date().toLocaleTimeString());
    } catch (err) {
        console.error("❌ Échec du ping Render :", err);
    }
}, 20 * 60 * 1000); // 15 minutes

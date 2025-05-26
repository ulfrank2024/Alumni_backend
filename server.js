const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");
const { fetch } = require("undici");

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "https://ulfrank2024.github.io",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: false,
    })
);

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

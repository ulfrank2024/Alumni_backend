const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");
const fetch = require("node-fetch"); // <--- Ajout ici

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

// ⏱️ Ping Render toutes les 10 minutes
setInterval(() => {
    fetch("https://alumni-backend-wmj4.onrender.com/")
        .then(() =>
            console.log(
                `🔁 Ping envoyé à Render à ${new Date().toLocaleTimeString()}`
            )
        )
        .catch((err) => console.error("❌ Erreur de ping :", err.message));
}, 15 * 60 * 1000);

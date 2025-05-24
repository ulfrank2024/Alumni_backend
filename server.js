const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");

dotenv.config();

const app = express();

// ✅ Autoriser uniquement le domaine GitHub Pages
app.use(
    cors({
        origin: "https://ulfrank2024.github.io",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: false, // ou true si tu utilises les cookies (sinon false)
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/form", formRoutes);

// Pour Render (ping route)
app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend de SJD Alumni");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

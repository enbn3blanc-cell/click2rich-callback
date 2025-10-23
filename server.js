// === Click2Rich Callback Server ===

const express = require("express");
const app = express();

// Permet de lire le corps des requêtes JSON
app.use(express.json());

// Route principale — test du serveur
app.get("/", (req, res) => {
  res.send("✅ Click2Rich Callback Server en ligne !");
});

// Route spéciale que TheoremReach appellera
app.post("/callback", (req, res) => {
  const { user_id, reward } = req.body;

  console.log(`💰 Utilisateur ${user_id} a gagné ${reward} coins via un sondage !`);
  res.status(200).send("✅ Reward reçu avec succès !");
});

// Démarre le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Click2Rich actif sur le port ${PORT}`);
});


// === Click2Rich Callback Server ===
const express = require("express");
const app = express();

app.use(express.json());

// Base de données temporaire (en mémoire)
let rewards = [];

// Route de test
app.get("/", (req, res) => {
  res.send("✅ Click2Rich Callback Server en ligne !");
});

// ✅ Route appelée par TheoremReach quand un sondage est terminé
app.get("/theoremreach_callback", (req, res) => {
  const { user_id, reward } = req.query;

  if (!user_id || !reward) {
    return res.status(400).send("❌ Paramètres manquants");
  }

  console.log(`💰 Utilisateur ${user_id} a gagné ${reward} coins via un sondage`);
  rewards.push({ user_id, reward: Number(reward), date: new Date() });

  res.status(200).send("✅ Reward reçu avec succès !");
});

// ✅ Route pour que ton app mobile récupère les récompenses
app.get("/rewards/:userId", (req, res) => {
  const userId = req.params.userId;
  const userRewards = rewards.filter(r => r.user_id === userId);
  res.json(userRewards);
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Click2Rich actif sur le port ${PORT}`);
});

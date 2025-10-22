const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Route de test simple
app.get("/", (req, res) => {
  res.send("✅ Serveur Click2Rich Callback en ligne !");
});

// Route spéciale pour TheoremReach callback
app.get("/theoremreach_callback", (req, res) => {
  const { user_id, reward, tx_id, hash } = req.query;

  console.log("📩 Callback reçu :", req.query);

  // Vérifie que les infos essentielles sont présentes
  if (!user_id || !reward) {
    return res.status(400).send("❌ Paramètres manquants");
  }

  // Simule un succès de traitement
  res.status(200).send("✅ Reward reçu avec succès !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});


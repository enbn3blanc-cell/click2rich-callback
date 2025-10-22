const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Fichier local pour stocker les récompenses (temporaire)
const DATA_FILE = path.join(__dirname, "rewards.json");

// Vérifie si le fichier existe sinon le crée
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}), "utf8");
}

// Route de test simple
app.get("/", (req, res) => {
  res.send("✅ Click2Rich Callback Server en ligne !");
});

// Route spéciale pour TheoremReach
app.get("/theoremreach_callback", (req, res) => {
  const { user_id, reward, tx_id, hash } = req.query;

  console.log("📩 Callback reçu :", req.query);

  // Vérifie que les infos essentielles sont présentes
  if (!user_id || !reward) {
    console.log("❌ Paramètres manquants !");
    return res.status(400).send("Paramètres manquants !");
  }

  // Charge le fichier de données
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // Si l'utilisateur n'existe pas encore, on l'initialise
  if (!data[user_id]) {
    data[user_id] = { coins: 0, lastReward: 0 };
  }

  // On ajoute la récompense
  data[user_id].coins += parseInt(reward);
  data[user_id].lastReward = Date.now();

  // Sauvegarde la mise à jour
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log(`💰 Utilisateur ${user_id} crédité de ${reward} coins !`);
  return res.status(200).send("✅ Reward reçu avec succès !");
});

// Route pour vérifier le solde d’un utilisateur
app.get("/user_balance", (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).send("Paramètre manquant : user_id");

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const user = data[user_id] || { coins: 0 };

  res.json({ user_id, coins: user.coins });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

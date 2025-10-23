// ✅ Version corrigée compatible ES Modules (Render + Node 22)
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Render fournit son propre port via process.env.PORT
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route d'accueil
app.get("/", (req, res) => {
  res.send("✅ Click2Rich Callback Server en ligne !");
});

// ✅ Route callback TheoremReach
app.get("/theoremreach_callback", (req, res) => {
  const { user_id, reward } = req.query;
  console.log(`✅ ${user_id} a gagné ${reward} coins via un sondage`);

  const filePath = path.join(__dirname, "rewards.json");
  let rewards = [];

  if (fs.existsSync(filePath)) {
    rewards = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  rewards.push({
    user_id,
    reward: Number(reward),
    date: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(rewards, null, 2));

  res.status(200).send("OK");
});

// ✅ Route pour afficher les récompenses d'un utilisateur
app.get("/rewards/:user_id", (req, res) => {
  const filePath = path.join(__dirname, "rewards.json");
  if (!fs.existsSync(filePath)) return res.json([]);

  const rewards = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const userRewards = rewards.filter(r => r.user_id === req.params.user_id);
  res.json(userRewards);
});

// ✅ Évite le crash si le port est déjà pris
app.listen(PORT, () => {
  console.log(`🚀 Serveur Click2Rich actif sur le port ${PORT}`);
});


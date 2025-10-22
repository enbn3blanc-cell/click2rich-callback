import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/theoremreach_callback", (req, res) => {
  const { user_id, reward } = req.query;
  if (!user_id || !reward) return res.status(400).send("❌ Missing parameters");
  console.log(`✅ ${user_id} a gagné ${reward} coins via un sondage`);
  res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`🚀 Serveur prêt sur le port ${PORT}`));

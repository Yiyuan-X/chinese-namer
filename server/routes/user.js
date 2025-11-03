import express from "express";
const router = express.Router();
const mockFavorites = [];

router.get("/profile", (req, res) => {
  res.json({
    ok: true,
    user: { id: "u_demo_001", nickname: "取名体验用户", vip: false },
    favorites: mockFavorites
  });
});

router.post("/favorite", (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ ok: false, error: "name required" });
  if (!mockFavorites.includes(name)) mockFavorites.push(name);
  res.json({ ok: true, favorites: mockFavorites });
});

router.post("/unfavorite", (req, res) => {
  const { name } = req.body || {};
  const idx = mockFavorites.indexOf(name);
  if (idx !== -1) mockFavorites.splice(idx, 1);
  res.json({ ok: true, favorites: mockFavorites });
});

export default router;

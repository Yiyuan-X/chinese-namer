import express from "express";
import { calcBaziInfo } from "../utils/bazi.js";
import { generateNames } from "../utils/name-engine.js";

const router = express.Router();

router.post("/generate", (req, res) => {
  const {
    surname = "",
    gender = "unknown",
    birth = "2025-11-03 10:00",
    expectChars = [],
    excludeChars = [],
    style = null
  } = req.body || {};
  if (!surname) {
    return res.status(400).json({ ok: false, error: "缺少姓氏" });
  }
  const baziInfo = calcBaziInfo(birth);
  const names = generateNames({
    surname, gender, birth, expectChars, excludeChars, style, baziInfo
  });
  res.json({
    ok: true,
    bazi: baziInfo,
    count: names.length,
    freeLimit: 20,
    list: names.slice(0, 20),
    hasMore: names.length > 20
  });
});

router.get("/detail", (req, res) => {
  const { name = "" } = req.query;
  if (!name) return res.status(400).json({ ok: false, error: "name required" });
  res.json({
    ok: true,
    name,
    score: 94,
    wuxingMatch: "此名五行以水木为主，可弥补命局所需之水，利于灵性与贵人缘。",
    zodiacMatch: "若为龙年之子，水能相助，行事多有相扶。",
    poem: "松风吹解带，山月照弹琴。—— 清雅之象",
    suggestSimilar: ["锦安", "安然", "思源", "清溪"]
  });
});

export default router;

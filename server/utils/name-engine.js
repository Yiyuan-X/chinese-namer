import { SINGLE_CHARS } from "../data/char-db.js";
import { POEM_SOURCES } from "../data/poems.js";
import { zodiacFavor } from "./zodiac.js";

function filterByStyle(style) {
  if (!style) return SINGLE_CHARS;
  return SINGLE_CHARS.filter(c => c.style && c.style.includes(style));
}

function scorePhonetic(fullname) {
  return Math.floor(75 + Math.random() * 20);
}

function findPoemDesc(name) {
  const found = POEM_SOURCES.find(p => name.includes(p.key));
  return found ? found.text : "字形端正，读之清雅，寓意吉祥。";
}

export function generateNames({
  surname,
  gender,
  birth,
  expectChars = [],
  excludeChars = [],
  style,
  baziInfo
}) {
  const basePool = filterByStyle(style);
  const results = [];
  for (let i = 0; i < basePool.length; i++) {
    for (let j = 0; j < basePool.length; j++) {
      if (i === j) continue;
      const c1 = basePool[i];
      const c2 = basePool[j];
      if (excludeChars.some(e => c1.char.includes(e) || c2.char.includes(e))) continue;
      let expectScore = 0;
      if (expectChars.length > 0) {
        if (expectChars.includes(c1.char)) expectScore += 15;
        if (expectChars.includes(c2.char)) expectScore += 15;
      }
      let wuxingScore = 0;
      if (baziInfo?.needElement) {
        if (c1.wuxing === baziInfo.needElement) wuxingScore += 12;
        if (c2.wuxing === baziInfo.needElement) wuxingScore += 12;
      }
      let zodiacScore = 0;
      if (baziInfo?.zodiac) {
        if (zodiacFavor(baziInfo.zodiac, c1.wuxing)) zodiacScore += 6;
        if (zodiacFavor(baziInfo.zodiac, c2.wuxing)) zodiacScore += 6;
      }
      const fullname = surname + c1.char + c2.char;
      const phoneticScore = scorePhonetic(fullname);
      const totalScore = 60 + expectScore + wuxingScore + zodiacScore + Math.floor(Math.random() * 8);
      results.push({
        name: fullname,
        surname,
        given: c1.char + c2.char,
        wuxing: [c1.wuxing, c2.wuxing],
        zodiac: baziInfo?.zodiac || null,
        analysis: findPoemDesc(c1.char + c2.char),
        phoneticScore,
        totalScore,
        baziNeed: baziInfo?.needElement,
        elementsDetail: [
          { char: c1.char, wuxing: c1.wuxing, meaning: c1.meaning },
          { char: c2.char, wuxing: c2.wuxing, meaning: c2.meaning }
        ]
      });
    }
  }
  return results.sort((a, b) => b.totalScore - a.totalScore).slice(0, 40);
}

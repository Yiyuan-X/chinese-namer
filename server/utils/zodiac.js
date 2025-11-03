const FAVOR = {
  "龙": ["water", "wood"],
  "虎": ["wood", "fire"],
  "兔": ["wood"],
  "鼠": ["water", "metal"],
  "牛": ["earth", "metal"],
  "蛇": ["fire", "earth"],
  "马": ["fire", "earth"],
  "羊": ["earth", "wood"],
  "猴": ["metal", "water"],
  "鸡": ["metal"],
  "狗": ["earth","metal"],
  "猪": ["water","wood"]
};

export function zodiacFavor(zodiac, element) {
  const fav = FAVOR[zodiac] || [];
  return fav.includes(element);
}

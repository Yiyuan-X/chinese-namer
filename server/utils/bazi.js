import dayjs from "dayjs";

export function calcBaziInfo(birth) {
  const d = dayjs(birth);
  const year = d.year();
  const zodiacIndex = (year - 4) % 12;
  const zodiacs = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
  const zodiac = zodiacs[zodiacIndex];
  const wuxingList = ["wood","fire","earth","metal","water"];
  const needElement = wuxingList[year % 5];
  const wuxingCN = { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" };
  return {
    year,
    zodiac,
    needElement,
    needElementCN: wuxingCN[needElement] || "木",
    raw: {
      yearPillar: "乙卯",
      monthPillar: "庚子",
      dayPillar: "辛亥",
      hourPillar: "丙午"
    }
  };
}

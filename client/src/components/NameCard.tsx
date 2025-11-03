import React from "react";
import { Card, Tag } from "antd-mobile";

const wuxingCN: any = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水"
};

export default function NameCard({ item, onClick }: { item: any; onClick?: () => void }) {
  return (
    <Card
      style={{ marginBottom: 10 }}
      onClick={onClick}
      title={<span style={{ fontFamily: "KaiTi, STKaiti, serif" }}>{item.name}</span>}
      extra={<span style={{ color: "#c97746" }}>{item.totalScore} 分</span>}
    >
      <div style={{ fontSize: 12, color: "#824024" }}>
        五行：{item.wuxing.map((w: string) => wuxingCN[w] || w).join(" / ")}{" "}
        {item.baziNeed ? `（补${wuxingCN[item.baziNeed] || item.baziNeed}）` : ""}
      </div>
      <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>{item.analysis}</div>
      <div style={{ marginTop: 6 }}>
        <Tag color="primary" fill="outline">
          音律 {item.phoneticScore}
        </Tag>
        {item.zodiac && (
          <Tag color="danger" fill="outline" style={{ marginLeft: 4 }}>
            生肖{item.zodiac}
          </Tag>
        )}
      </div>
    </Card>
  );
}

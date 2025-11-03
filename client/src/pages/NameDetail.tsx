import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";

export default function NameDetail() {
  const location = useLocation() as any;
  const navigate = useNavigate();
  const item = location.state?.item;
  const bazi = location.state?.bazi;

  if (!item) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 16px",
          background: "linear-gradient(180deg,#faf6f0 0%,#f2eadf 100%)",
          fontFamily: '"STKaiti","KaiTi","SongTi SC",serif',
          color: "#6b5438",
        }}
      >
        <p>暂无名字详情，请返回选择名字。</p>
        <Button
          color="primary"
          onClick={() => navigate(-1)}
          style={{
            background: "linear-gradient(90deg,#c49c62,#e2b878)",
            border: "none",
            color: "white",
            borderRadius: 8,
          }}
        >
          返回上一页
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px 16px 100px",
        background: "linear-gradient(180deg,#faf6f0 0%,#f2eadf 100%)",
        fontFamily: '"STKaiti","KaiTi","SongTi SC",serif',
        minHeight: "100vh",
      }}
    >
      {/* ✨ 标题 */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 30,
            color: "#3a2f1e",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          「 {item.name} 」
        </h2>
        <p style={{ fontSize: 14, color: "#9a5a36", margin: 0 }}>
          八字：{bazi?.birth || "—"}　·　生肖：{bazi?.zodiac || "—"}　
          ·　主五行：{bazi?.needElementCN || "平衡"}
        </p>
      </div>

      {/* 🌿 分割线 */}
      <div
        style={{
          width: "60%",
          height: 2,
          background:
            "linear-gradient(to right, transparent, #c49c62, transparent)",
          margin: "16px auto",
        }}
      ></div>

      {/* 🌸 寓意解析 */}
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          marginBottom: 20,
          lineHeight: 1.8,
          animation: "fadeInUp 0.4s ease forwards",
        }}
      >
        <h3 style={{ color: "#3a2f1e", marginBottom: 10 }}>🌸 寓意解析</h3>
        <p style={{ color: "#665f54", fontSize: 15 }}>
          {item.meaning ||
            "此名音韵优美，字义高雅，寓意宝宝人生顺遂、吉祥如意。"}
        </p>
        <p style={{ fontSize: 13, color: "#a18d72" }}>
          诗意出处：{item.source || "（可在高级报告中查看诗词出处）"}
        </p>
      </div>

      {/* ⚖ 五行分析 */}
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          marginBottom: 20,
          animation: "fadeInUp 0.6s ease 0.2s forwards",
        }}
      >
        <h3 style={{ color: "#3a2f1e", marginBottom: 10 }}>⚖ 五行分析</h3>
        <p style={{ color: "#665f54", fontSize: 15 }}>
          此名整体五行结构：
          <strong style={{ color: "#9a5a36" }}>{item.wuxing || "水木"}</strong>
          ，
          {bazi?.needElementCN
            ? `可弥补命局所需之「${bazi.needElementCN}」之气，`
            : ""}
          有助于五行流通、平衡命理。
        </p>
        <p style={{ fontSize: 13, color: "#a18d72" }}>
          （若为{bazi?.zodiac || "宝宝"}，{item.wuxingDesc || "此组合相辅相成，吉祥安顺"}）
        </p>
      </div>

      {/* 🎵 音律与评分 */}
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          marginBottom: 20,
          animation: "fadeInUp 0.8s ease 0.4s forwards",
        }}
      >
        <h3 style={{ color: "#3a2f1e", marginBottom: 10 }}>🎵 音律与评分</h3>
        <p style={{ color: "#665f54", fontSize: 15 }}>
          声调结构：{item.yinlv || "平仄平"}； 音律协调度：
          <strong style={{ color: "#9a5a36" }}>{item.score || 92}分</strong>
        </p>
        <p style={{ fontSize: 13, color: "#a18d72" }}>
          发音朗朗上口，富有节奏感，听感温润悦耳。
        </p>
      </div>

      {/* 💰 解锁报告 */}
      <div style={{ marginTop: 24 }}>
        <Button
          block
          color="primary"
          onClick={() =>
            alert("💰 此功能为付费报告，可接入支付后生成精美报告图片。")
          }
          style={{
            background: "linear-gradient(90deg,#c49c62,#e2b878)",
            border: "none",
            fontWeight: "bold",
            color: "white",
            borderRadius: 8,
          }}
        >
          📜 解锁大师级深度报告 ¥28.8
        </Button>
      </div>

      {/* 🔙 返回按钮 */}
      <div style={{ marginTop: 16 }}>
        <Button
          block
          onClick={() => navigate(-1)}
          style={{
            border: "1px solid #d8cbb3",
            color: "#6b5438",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          ↩ 返回上一页
        </Button>
      </div>

      {/* 页脚签名 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          color: "#a18d72",
          fontSize: 12,
        }}
      >
        —— 「 名字如诗 · 启运如风 」 ——
      </div>
    </div>
  );
}

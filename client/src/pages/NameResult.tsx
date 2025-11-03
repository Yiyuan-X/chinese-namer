import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Toast } from "antd-mobile";
import NameCard from "../components/NameCard";

export default function NameResult() {
  const location = useLocation() as any;
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 16px",
          fontFamily: '"STKaiti","KaiTi","SongTi SC",serif',
          color: "#6b5438",
          background: "linear-gradient(180deg,#faf6f0 0%,#f2eadf 100%)",
          minHeight: "100vh",
        }}
      >
        <p style={{ fontSize: 16, marginBottom: 20 }}>暂无生成结果，请先输入宝宝信息。</p>
        <Button
          color="primary"
          onClick={() => navigate("/")}
          style={{
            background: "linear-gradient(90deg,#c49c62,#e2b878)",
            border: "none",
            color: "white",
            borderRadius: 8,
          }}
        >
          返回取名页
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
      {/* 顶部标题 */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 26,
            color: "#3a2f1e",
            marginBottom: 6,
            letterSpacing: 2,
          }}
        >
          📜 生成的佳名
        </h2>
        <p style={{ fontSize: 14, color: "#9a5a36", margin: 0 }}>
          生肖：{data.bazi?.zodiac || "未知"}　·　补益五行：
          <strong style={{ color: "#824024" }}>
            {data.bazi?.needElementCN || "平衡"}
          </strong>
          （显示 {data.list.length}/{data.count}）
        </p>
      </div>

      {/* 名字卡片列表 */}
      <div>
        {data.list.map((item: any, i: number) => (
          <div
            key={item.name}
            onClick={() =>
              navigate("/detail", { state: { item, bazi: data.bazi } })
            }
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 14,
              boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
              border: "1px solid #eee",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-3px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 5px 14px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 3px 10px rgba(0,0,0,0.06)";
            }}
          >
            <div style={{ fontSize: 22, color: "#3a2f1e", marginBottom: 6 }}>
              {item.name}
            </div>
            <div style={{ fontSize: 13, color: "#665f54", marginBottom: 4 }}>
              五行：{item.wuxing || "—"}　·　音律：{item.yinlv || "—"}　
              <span style={{ color: "#9a5a36" }}>
                {item.meaning || "寓意美好"}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#a18d72",
                fontStyle: "italic",
              }}
            >
              「 此名{item.wuxingDesc || "五行协调，寓意吉祥"} 」
            </div>
          </div>
        ))}
      </div>

      {/* 付费查看更多 */}
      {data.hasMore && (
        <div style={{ marginTop: 24 }}>
          <Button
            block
            color="primary"
            onClick={() =>
              Toast.show("💰 这是付费功能示例，可接入微信/支付宝/Stripe 支付。")
            }
            style={{
              background: "linear-gradient(90deg,#c49c62,#e2b878)",
              border: "none",
              fontWeight: "bold",
              color: "white",
              borderRadius: 8,
            }}
          >
            🔓 解锁更多同风格好名 ¥58
          </Button>
        </div>
      )}

      {/* 返回按钮 */}
      <div style={{ marginTop: 16 }}>
        <Button
          block
          onClick={() => navigate("/")}
          style={{
            border: "1px solid #d8cbb3",
            color: "#6b5438",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          ↩ 重新生成
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

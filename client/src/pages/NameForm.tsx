import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Selector, Button, Toast } from "antd-mobile";
import dayjs from "dayjs";
import { generateNames } from "../api";

// 🌸 名字风格选项
const styleOptions = [
  { label: "文雅古典", value: "wenya" },
  { label: "阳光开朗", value: "sunny" },
  { label: "沉稳大气", value: "dignity" },
  { label: "清新自然", value: "fresh" }
];

export default function NameForm() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [style, setStyle] = useState<string[]>(["wenya"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(values: any) {
    if (!values.surname) {
      Toast.show("请输入宝宝姓氏");
      return;
    }
    setLoading(true);
    const birth = dayjs(date || new Date()).format("YYYY-MM-DD HH:mm");
    const payload = {
      surname: values.surname.trim(),
      gender: values.gender ? values.gender[0] : "unknown",
      birth,
      expectChars: values.expectChars ? values.expectChars.split("") : [],
      excludeChars: values.excludeChars ? values.excludeChars.split("") : [],
      style: style[0]
    };
    const res = await generateNames(payload);
    setLoading(false);
    if (!res.ok) {
      Toast.show("生成失败，请稍后重试");
      return;
    }
    navigate("/result", { state: { data: res, form: payload } });
  }

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#faf6f0 0%,#f2eadf 100%)",
        minHeight: "100vh",
        padding: "20px 16px 100px",
        fontFamily: '"STKaiti","KaiTi","SongTi SC",serif',
      }}
    >
      {/* ✨ 标题区 */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 10px 0",
          borderBottom: "1px dashed #d8cbb3",
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            color: "#3a2f1e",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          🌸 佳名启运
        </h1>
        <p style={{ margin: 0, color: "#9a5a36", fontSize: 14 }}>
          生辰八字 · 五行平衡 · 诗意如画
        </p>
      </div>

      {/* 🧧 表单卡片 */}
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          animation: "fadeIn 0.5s ease",
        }}
      >
        <Form
          layout="vertical"
          onFinish={onSubmit}
          footer={
            <Button
              block
              type="submit"
              color="primary"
              loading={loading}
              style={{
                background:
                  "linear-gradient(90deg,#c49c62 0%,#e2b878 100%)",
                border: "none",
                fontWeight: "bold",
                fontSize: 16,
                color: "#fff",
                borderRadius: 8,
              }}
            >
              ✨ 一键生成佳名
            </Button>
          }
        >
          <Form.Item
            name="surname"
            label="宝宝姓氏"
            rules={[{ required: true, message: "请输入姓氏" }]}
          >
            <Input placeholder="如：李 / 欧阳 / 司马" clearable />
          </Form.Item>

          <Form.Item name="gender" label="宝宝性别">
            <Selector
              options={[
                { label: "男宝", value: "boy" },
                { label: "女宝", value: "girl" },
                { label: "待定", value: "unknown" },
              ]}
              multiple={false}
              defaultValue={["unknown"]}
            />
          </Form.Item>

          {/* 📅 出生日期时间 */}
          <Form.Item label="出生日期时间">
            <Button
              block
              onClick={async () => {
                const val = await DatePicker.prompt({
                  precision: "minute",
                  defaultValue: date || new Date(),
                });
                if (val) setDate(val);
              }}
            >
              {date
                ? dayjs(date).format("YYYY-MM-DD HH:mm")
                : "请选择出生时间"}
            </Button>
            <div
              style={{
                fontSize: 12,
                color: "#999",
                marginTop: 4,
                textAlign: "right",
              }}
            >
              默认公历，农历可在后端扩展。
            </div>
          </Form.Item>

          <Form.Item name="expectChars" label="父母期望字（可选）">
            <Input placeholder="如：安锦泽，直接输入想要的字" />
          </Form.Item>

          <Form.Item name="excludeChars" label="排除字（可选）">
            <Input placeholder="不想出现的字，如：土、俗、狗" />
          </Form.Item>

          <Form.Item label="名字风格">
            <Selector
              options={styleOptions}
              value={style}
              multiple={false}
              onChange={(v) => setStyle(v as string[])}
            />
          </Form.Item>
        </Form>
      </div>

      {/* 📜 提示文字 */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <p
          style={{
            fontSize: 13,
            color: "#937d5b",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          小提示：完整八字、三才五格、诗词出处，可在
          <strong> 名字详情页 </strong>
          解锁查看。
        </p>
      </div>

      {/* 🔮 底部标语 */}
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#a18d72",
          marginTop: 40,
        }}
      >
        —— 「 名字如诗 · 启运如风 」 ——
      </div>
    </div>
  );
}

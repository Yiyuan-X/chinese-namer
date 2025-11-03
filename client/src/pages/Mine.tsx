import React, { useEffect, useState } from "react";
import { getProfile } from "../api";
import { List } from "antd-mobile";

export default function Mine() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      setData(res);
    })();
  }, []);

  if (!data) return <div style={{ padding: 16 }}>加载中...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2 className="guofeng-title">我的</h2>
      <p>昵称：{data.user.nickname}</p>
      <p>会员：{data.user.vip ? "是" : "否"}</p>
      <h3 style={{ marginTop: 16 }}>收藏的名字</h3>
      <List>
        {data.favorites.length === 0 && <List.Item>还没有收藏名字</List.Item>}
        {data.favorites.map((n: string) => (
          <List.Item key={n}>{n}</List.Item>
        ))}
      </List>
    </div>
  );
}

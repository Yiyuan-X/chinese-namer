import React from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import NameForm from "./pages/NameForm"
import NameResult from "./pages/NameResult"
import NameDetail from "./pages/NameDetail"
import Knowledge from "./pages/Knowledge"
import Mine from "./pages/Mine"
import { TabBar } from "antd-mobile"

const tabs = [
  { key: "/", title: "取名" },
  { key: "/knowledge", title: "取名知识" },
  { key: "/mine", title: "我的" }
]

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeKey = tabs.find(t => t.key === location.pathname) ? location.pathname : "/"

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<NameForm />} />
          <Route path="/result" element={<NameResult />} />
          <Route path="/detail" element={<NameDetail />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <TabBar activeKey={activeKey} onChange={key => navigate(key)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default function App() {
  return <Layout />
}

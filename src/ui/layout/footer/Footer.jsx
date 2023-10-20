import React, { useState, useEffect } from "react";
import { Button, Space, Typography } from "antd";
import settingsData from "../../../../src/data/settings.json";
import footerMenuData from "../../../../src/data/footer-menu.json";

const { Text } = Typography;

export default function Footer() {
  const [settings, setSettings] = useState({});
  const [footerMenu, setFooterMenu] = useState([]);

  useEffect(() => {
    // Directly set the imported data to state
    setSettings(settingsData);
    setFooterMenu(footerMenuData);
  }, []);
  return (
    <div
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(249, 249, 249, 0.95)", // Optional: to give a background color
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Optional: to give a slight shadow effect
      }}>
      <Text style={{ fontSize: "11px" }}>Mail: {settings.mail}</Text>
      <Space>
        {footerMenu.map((menu) => (
          <Button
            style={{ fontSize: "11px" }}
            type="text"
            key={menu.id}
            onClick={() => console.log("Button clicked:", menu.label)}>
            {menu.label}
          </Button>
        ))}
      </Space>
      <Text style={{ fontSize: "11px" }}>{settings.copyright}</Text>
    </div>
  );
}

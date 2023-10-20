// Header.jsx

import { useEffect, useState, useContext } from "react";
import { Row, Col, Typography, Button, Avatar, Menu, Drawer, Grid } from "antd";
import { BellFilled, CaretDownOutlined, MessageFilled, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import settingsData from "../../../../public/data/settings.json";
import menuData from "../../../../public/data/menu.json";
import userData from "../../../../public/data/user.json";
const { useBreakpoint } = Grid; // Corrected import
import { ThemeContext } from "../../../../src/App";

const { Text } = Typography;

const MoonIcon = () => (
  <svg
    className="custom-svg-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.9 16.39c-2.33 1.34-5.26 0.9-7.19-1.13-1.94-2.02-2.37-5.03-1.13-7.45 1.17-2.25 3.63-3.67 6.32-3.67 3.5 0 6.36 2.86 6.36 6.36 0 2.69-1.42 5.15-3.67 6.32-.86.45-1.79.69-2.69.57z"
      fill="currentColor"
    />
  </svg>
);

export default function Header() {
  const [settings, setSettings] = useState(settingsData);
  const [menuItems, setMenuItems] = useState(menuData);
  const [user, setUser] = useState(userData);
  const [visible, setVisible] = useState(false); // State for Drawer visibility
  const screens = useBreakpoint();
  const { theme, setTheme } = useContext(ThemeContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const headerClass = theme === "dark" ? "header-dark" : "header-light";

  return (
    <div
      className={headerClass}
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}>
      <Row align="middle" justify="space-between" style={{ width: "100%", padding: "0 20px" }}>
        <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={settings.logo} alt={settings.logo_title} height="30px" />
            <Text>{settings.logo_title}</Text>
          </Link>
        </Col>
        {screens.md ? (
          <>
            <Col>
              {menuItems.map((item) => (
                <Button type="text" key={item.id}>
                  {item.label}
                </Button>
              ))}
            </Col>
            <Col style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Button
                icon={<MessageFilled style={{ color: theme === "light" ? "#333333" : "#ffffff" }} />}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />
              <Button
                icon={<BellFilled style={{ color: theme === "light" ? "#333333" : "#ffffff" }} />}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />
              <Button
                icon={<MoonIcon color={theme === "light" ? "#333333" : "#ffffff"} />}
                onClick={toggleTheme}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                  <Text style={{ fontSize: "17px", display: "flex", justifyContent: "flex-end", fontWeight: "600" }}>
                    {user.name}
                  </Text>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Text>Vote: {user.vote},</Text>
                    <Text>Survey: {user.survey}</Text>
                  </div>
                </div>
                <CaretDownOutlined />
                <Avatar src={user.img} style={{ border: "2px solid green" }} />
              </div>
            </Col>
          </>
        ) : (
          <Button
            icon={<MenuOutlined style={{ color: theme === "dark" ? "#fff" : "#333" }} />}
            onClick={showDrawer}
            style={{
              backgroundColor: theme === "dark" ? "#333" : "#fff", // dark background for dark theme, white for light theme
              borderColor: theme === "dark" ? "#666" : "#d9d9d9", // adjust as needed
            }}
          />
        )}
      </Row>
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        className={theme === "dark" ? "dark-drawer" : ""}>
        <Menu mode="vertical">
          <Col
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar src={user.img} style={{ border: "2px solid green" }} />
              <CaretDownOutlined />
              <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                <Text style={{ fontSize: "17px", display: "flex", fontWeight: "600" }}>{user.name}</Text>
                <div style={{ display: "flex", gap: "5px" }}>
                  <Text>Vote: {user.vote},</Text>
                  <Text>Survey: {user.survey}</Text>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyItems: "center", gap: "15px" }}>
              <Button
                icon={<MessageFilled style={{ color: theme === "light" ? "#333333" : "#ffffff" }} />}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />
              <Button
                icon={<BellFilled style={{ color: theme === "light" ? "#333333" : "#ffffff" }} />}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />
              <Button
                icon={<MoonIcon color={theme === "light" ? "#333333" : "#ffffff"} />}
                onClick={toggleTheme}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                  borderColor: theme === "light" ? "#d9d9d9" : "#666666",
                }}
              />
            </div>
          </Col>
          {menuItems.map((item) => (
            <Menu.Item key={item.id} style={{ textAlign: "center" }}>
              <Button type="text">{item.label}</Button>
            </Menu.Item>
          ))}
          {/* ... [Add other components like Message, Bell, MoonIcon, etc. inside the Drawer] */}
        </Menu>
      </Drawer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Avatar } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

export default function Header() {
  const [settings, setSettings] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("../../../../src/data/settings.json")
      .then((response) => response.json())
      .then((data) => setSettings(data));

    fetch("../../../../src/data/menu.json")
      .then((response) => response.json())
      .then((data) => setMenuItems(data));

    fetch("../../../../src/data/user.json")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
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
        <Col>
          {menuItems.map((item) => (
            <Button type="text" key={item.id}>
              {item.label}
            </Button>
          ))}
        </Col>
        <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
        </Col>
      </Row>
    </div>
  );
}

// SurveysPage.jsx

import { Link } from "react-router-dom";
import { Card, Col, Row, Typography, Spin, Button } from "antd";
import { useEffect, useState, useRef, useCallback } from "react";
import { ExportOutlined, HeartFilled, LikeFilled, PlusOutlined } from "@ant-design/icons";
import cardData from "../../../../public/data/1-main-page/card_json.json"; // Import the JSON data directly
import { useSelector } from "react-redux";

const { Text } = Typography;

export default function SurveysPage() {
  const INITIAL_COUNT = 15;
  const CHUNK_SIZE = 5;
  const surveys = useSelector((state) => state.surveys);
  const combinedData = [...cardData, ...surveys].reverse(); // Combine and reverse the data

  const [data, setData] = useState(combinedData.slice(0, INITIAL_COUNT));
  const [currentCount, setCurrentCount] = useState(INITIAL_COUNT);

  const observer = useRef();

  const lastCardRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentCount < combinedData.length) {
          fetchData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [currentCount]
  );

  const fetchData = () => {
    setTimeout(() => {
      const nextData = combinedData.slice(currentCount, currentCount + CHUNK_SIZE);
      setData((prevData) => [...prevData, ...nextData]);
      setCurrentCount((prevCount) => prevCount + CHUNK_SIZE);
    }, 1000); // 1000ms delay (1 second)
  };

  return (
    <div style={{ padding: "60px 0 50px 0" }}>
      <Row
        gutter={16}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginLeft: "0",
          marginRight: "0",
        }}>
        <Link to="/newsurvey">
          <Button
            className="custom-button"
            style={{
              width: "350px",
              height: "198px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              border: "2px solid green",
            }}>
            <PlusOutlined />
            Add New Survay
          </Button>
        </Link>

        {data.map((item, index) => (
          <div style={{ borderRadius: "5px" }} key={item.id} ref={index === data.length - 1 ? lastCardRef : null}>
            <Link to={`/viewsurvey/`}>
              <Card
                bodyStyle={{ padding: "0px" }}
                hoverable
                cover={
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: "5px" }}>
                    <img alt={item.title} src={item.img} style={{ width: "100%", borderRadius: "5px" }} />

                    <div
                      style={{
                        position: "absolute",
                        bottom: "6px",
                        left: "0px",
                        color: "white",
                        background: "rgba(0,0,0,0.7)",
                        padding: "5px",
                        borderRadius: "5px",
                        width: "100%",
                      }}>
                      <Text style={{ color: "white", fontSize: "13px" }} strong>
                        {item.title}
                      </Text>
                      <br />
                      <Text style={{ color: "white", fontSize: "11px" }}>{item.subtitle}</Text>
                      <div style={{ display: "flex", gap: "3px", position: "absolute", right: "13px", bottom: "8px" }}>
                        <HeartFilled />
                        <ExportOutlined />
                        <LikeFilled />
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        color: "white",
                        background: "rgba(0,0,0,0.7)",
                        padding: "5px",
                        borderRadius: "5px",
                      }}>
                      <Text style={{ color: "white", fontSize: "11px" }}>Vote:</Text>
                    </div>
                  </div>
                }
                style={{ borderRadius: "5px", width: "350px", height: "198px", border: "3px solid #01b1b1" }}
              />
            </Link>
          </div>
        ))}
      </Row>
      {currentCount < combinedData.length && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "50px" }}>
          <Spin tip="Loading..." />
        </div>
      )}
    </div>
  );
}

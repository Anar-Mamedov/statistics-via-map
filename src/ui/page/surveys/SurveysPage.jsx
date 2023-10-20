import { Link } from "react-router-dom";
import { Card, Col, Row, Typography, Spin, Button } from "antd";
import { useEffect, useState, useRef, useCallback } from "react";
import { ExportOutlined, HeartFilled, LikeFilled, PlusOutlined } from "@ant-design/icons";
import cardData from "../../../../src/data/1-main-page/card_json.json"; // Import the JSON data directly

const { Text } = Typography;

export default function SurveysPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const CHUNK_SIZE = 10;

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const start = currentChunkIndex * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunk = cardData.slice(start, end);
      if (chunk.length < CHUNK_SIZE) {
        setHasMore(false);
      }
      setData((prevData) => [...prevData, ...chunk]);
      setCurrentChunkIndex((prevIndex) => prevIndex + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      {loading && hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "50px" }}>
          <Spin tip="Loading..." />
        </div>
      )}
    </div>
  );
}

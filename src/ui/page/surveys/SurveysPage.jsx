import { Link } from "react-router-dom";
import { Card, Col, Row, Typography, Spin, Button } from "antd";
import { useEffect, useState, useRef, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function SurveysPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Indicates if more data is available

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Load more data here
          fetchData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchData = () => {
    setLoading(true);
    const url = "../../../../src/data/1-main-page/card_json.json";
    fetch(url)
      .then((response) => response.json())
      .then((newData) => {
        setData((prevData) => [...prevData, ...newData]);
        setLoading(false);
        // setHasMore(false); // Set to false if no more data is available
      })
      .catch((error) => console.error("Error fetching data:", error));
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
                    </div>
                  </div>
                }
                style={{ borderRadius: "5px", width: "350px", height: "198px", border: "3px solid #01b1b1" }}
              />
            </Link>
          </div>
        ))}
      </Row>

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "50px" }}>
          <Spin tip="Loading..." />
        </div>
      )}
    </div>
  );
}

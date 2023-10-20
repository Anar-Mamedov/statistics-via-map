import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import ThematicMapPage from "../map/ThematicMapPage";
import Descending from "./ui/Descending/Descending";
import Ascending from "./ui/Ascending/Ascending";
import PieChart from "./ui/PieChart/PieChart";
import ResultsTable from "./ui/ResultsTable/ResultsTable";

export default function ViewSurvey() {
  const [isMinimized, setIsMinimized] = useState(window.innerWidth <= 768); // Assuming 768px as the breakpoint for mobile screens

  useEffect(() => {
    const handleResize = () => {
      setIsMinimized(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Row style={{ padding: "0px 0px", position: "absolute", top: "50px", width: "100%" }}>
      {isMinimized ? (
        <>
          <Col span={24} style={{ height: "300px", padding: "10px" }}>
            <ThematicMapPage />
          </Col>
          <Col
            span={24}
            style={{
              overflowY: "scroll",
              maxHeight: "calc(100vh - 350px)",
              padding: "0px 20px 70px 20px",
              border: "1px solid red",
            }}>
            <Descending />
            <Ascending />
            <PieChart />
            <ResultsTable />
          </Col>
        </>
      ) : (
        <>
          <Col span={17} style={{ width: "100%", height: "90vh", padding: "10px" }}>
            <ThematicMapPage />
          </Col>
          <Col
            span={7}
            style={{
              padding: "0px 20px 50px 20px",
              width: "600px",
              display: "flex",
              flexDirection: "column",
              height: "90vh",
              overflowY: "auto",
            }}>
            <Descending />
            <Ascending />
            <PieChart />
            <ResultsTable />
          </Col>
        </>
      )}
    </Row>
  );
}

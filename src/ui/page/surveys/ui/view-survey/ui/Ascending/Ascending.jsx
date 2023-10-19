import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Typography } from "antd";

const { Title } = Typography;

export default function Ascending() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("../../../../../../../../src/data/3-item-view/top-10-ascending.json")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.data.map((item) => item.label);
        const votes = data.data.map((item) => item.vote);

        setChartData({
          title: data.title,
          labels: labels,
          datasets: [
            {
              label: "Votes",
              data: votes,
              backgroundColor: "green",
              borderColor: "green",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Title level={4}>{chartData && chartData.title}</Title>
      {chartData && <Bar data={chartData} options={{ scales: { x: { type: "category" } } }} />}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Typography } from "antd";
import top10AscendingData from "../../../../../../../../public/data/3-item-view/top-10-ascending.json"; // Import the JSON data directly

const { Title } = Typography;

export default function Ascending() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process the imported data
    const labels = top10AscendingData.data.map((item) => item.label);
    const votes = top10AscendingData.data.map((item) => item.vote);

    setChartData({
      title: top10AscendingData.title,
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
  }, []);

  return (
    <div>
      <Title level={4}>{chartData && chartData.title}</Title>
      {chartData && <Bar data={chartData} options={{ scales: { x: { type: "category" } } }} />}
    </div>
  );
}

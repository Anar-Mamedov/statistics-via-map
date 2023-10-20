import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Typography } from "antd";

const { Title } = Typography;

export default function PieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("../../../../../../../../public/data/3-item-view/all-pie-chart.json")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.data.map((item) => item.label);
        const votes = data.data.map((item) => item.vote);

        // Define an array of colors
        const colors = [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
          "#C9CBCF",
          "#24A098",
          "#A463F2",
        ];

        setChartData({
          title: data.title,
          labels: labels,
          datasets: [
            {
              label: "Votes",
              data: votes,
              backgroundColor: colors, // Use the colors array here
              borderColor: colors,
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
      {chartData && <Pie data={chartData} />}
    </div>
  );
}

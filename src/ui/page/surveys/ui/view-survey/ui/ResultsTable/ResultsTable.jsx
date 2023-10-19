import React, { useState, useEffect } from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

export default function ResultsTable() {
  const [tableData, setTableData] = useState({
    title: "",
    type: "",
    columns: [],
    data: [],
  });

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch("../../../../../../../../src/data/3-item-view/list-of-results.json")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Title level={4}>{tableData.title}</Title>
      <Table
        dataSource={tableData.data}
        columns={tableData.columns.map((col) => ({
          title: col.title,
          dataIndex: col.field,
          key: col.field,
        }))}
        rowKey="id"
      />
    </div>
  );
}

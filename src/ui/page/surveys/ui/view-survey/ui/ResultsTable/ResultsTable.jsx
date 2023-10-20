import React, { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import resultsData from "../../../../../../../../public/data/3-item-view/list-of-results.json"; // Import the JSON data directly

const { Title } = Typography;

export default function ResultsTable() {
  const [tableData, setTableData] = useState({
    title: "",
    type: "",
    columns: [],
    data: [],
  });

  useEffect(() => {
    // Directly set the imported data to state
    setTableData(resultsData);
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

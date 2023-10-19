import React, { useState, useEffect } from "react";
import { Table } from "antd";

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
      <h2>{tableData.title}</h2>
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

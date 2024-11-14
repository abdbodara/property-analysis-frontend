import React, { useEffect, useState } from "react";
import axios from "axios";

function DataSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/data-summary/")
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error("Error fetching data summary:", error);
      });
  }, []);

  if (!summary) {
    return <p>Loading data summary...</p>;
  }

  const createTableRows = (summaryData) => {
    return Object.keys(summaryData).map((key) => {
      const category = summaryData[key];
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{category["0"]}</td>
          <td>{category["5"]}</td>
          <td>{category["10"]}</td>
          <td>{category["20"]}</td>
          <td>{category["25"]}</td>
        </tr>
      );
    });
  };

  return (
    <div >
      <h2>Data Summary</h2>
      <table className="dataTable2" border="1" style={{ maxWidth: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>0%</th>
            <th>5%</th>
            <th>10%</th>
            <th>20%</th>
            <th>25%</th>
          </tr>
        </thead>
        <tbody>{createTableRows(summary)}</tbody>
      </table>
    </div>
  );
}

export default DataSummary;

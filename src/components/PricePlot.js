import React, { useState, useEffect } from "react";
import axios from "axios";

const PricePlot = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [imageSrcs, setImageSrcs] = useState(null);
  console.log("🚀 ~ PricePlot ~ imageSrcs:", imageSrcs);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/model-evaluation/")
      .then((response) => {
        setMetrics(response.data.metrics);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/plot-price-by-height/", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(new Blob([response.data]));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/plot-actual-vs-predicted/", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrcs(reader.result);
        };
        reader.readAsDataURL(new Blob([response.data]));
      })
      .catch((error) => {
        console.error("Error fetching plot:", error);
      });
  }, []);
  return (
    <div className="model">
      <div className="imageDiv">
        <h2>Property Prices by Tree Height Categories</h2>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Price plot"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>Loading plot...</p>
        )}
      </div>
      <div className="imageDiv">
        <h2>Actual vs Predicted Property Prices</h2>
        {imageSrcs ? (
          <img
            src={imageSrcs}
            alt="Actual vs Predicted Plot"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>Loading plot...</p>
        )}
      </div>
      <h1>Model Evaluation Metrics</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {metrics ? (
        <table
          border="1"
          cellPadding="10"
          className="dataTable"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics).map(([metric, value]) => (
              <tr key={metric}>
                <td>{metric}</td>
                <td>{value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading metrics...</p>
      )}
    </div>
  );
};

export default PricePlot;

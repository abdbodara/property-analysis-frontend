import React, { useState, useEffect } from "react";
import axios from "axios";
import DataSummary from "./DataSummary";

function ActualVsPredictedPlot() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/plot-actual-vs-predicted/", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(new Blob([response.data]));
      })
      .catch((error) => {
        console.error("Error fetching plot:", error);
      });
  }, []);

  return (
    <>
      <div className="imageDiv">
        <h2>Actual vs Predicted Property Prices</h2>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Actual vs Predicted Plot"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <p>Loading plot...</p>
        )}
      </div>
      <DataSummary />
    </>
  );
}

export default ActualVsPredictedPlot;

import React, { useState } from "react";
import { fetchPredictedPrice } from "../services/api";

const PricePrediction = () => {
  const [streetName, setStreetName] = useState("");
  console.log("🚀 ~ PricePrediction ~ streetName:", streetName);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const data = await fetchPredictedPrice(streetName);
      setPredictedPrice(data.predicted_price);
    } catch (err) {
      setError("Error fetching price. Please try again.");
    }
  };

  return (
    <div className="predict">
      <h2>Predict Property Price</h2>
      <form onSubmit={handleSubmit} className="predictForm">
        <input
          type="text"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
          placeholder="Enter Street Name"
        />
        <button type="submit">Predict Price</button>
      </form>
      {predictedPrice !== null && (
        <div>
          <h3>Predicted Price: <span>${predictedPrice}</span></h3>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default PricePrediction;

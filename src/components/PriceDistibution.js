import React, { useEffect, useState } from "react";
import axios from "axios";

function PriceDistribution() {
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/price-distribution/")
      .then((response) => {
        setPriceData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const sumPrices = (prices) =>
    prices.reduce((total, price) => total + price, 0);

  return (
    <div>
      <h1>Price Distribution</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!priceData ? (
        <p>Loading...</p>
      ) : (
        <table className="dataTable3" border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Prices</th>
              <th>Total Sum</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(priceData).map(([category, prices]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{prices.join(", ")}</td>
                <td>{sumPrices(prices)}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PriceDistribution;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PricePrediction from "./components/PricePrediction";
import PricePlot from "./components/PricePlot";
import ActualVsPredictedPlot from "./components/ActualVsPredictedPlot";
import DataSummary from "./components/DataSummary";
import PriceDistribution from "./components/PriceDistibution";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main">
          <h1>Welcome to the Price Prediction App</h1>
        </div>
        <Routes>
          <Route path="/" element={<PricePrediction />} />
          <Route path="/price-plot" element={<PricePlot />} />
          <Route path="/data-summary" element={<DataSummary />} />
          <Route path="/price-distribution" element={<PriceDistribution />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/predict-price/";

export const fetchPredictedPrice = async (streetName) => {
  try {
    const response = await axios.post(API_URL, { street_name: streetName });
    return response.data;
  } catch (error) {
    console.error("Error fetching predicted price:", error);
    throw error;
  }
};

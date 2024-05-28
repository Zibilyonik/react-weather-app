import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = ({ latitude, longitude, forecastDays, hourlyParams }) => {
  const [data, setData] = useState("waiting for data...");
  const [error, setError] = useState(null);
  const API_URL = `https://api.open-meteo.com/v1/gem?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams.join(
    ","
  )}&forecast_days=${forecastDays}`;
  const sendRequest = async () => {
    setData("waiting for data...");
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
  };
  useEffect(() => {
    sendRequest();
    const timer = setInterval(sendRequest, 60000);
    return () => clearInterval(timer);
  }, [latitude, longitude, forecastDays, hourlyParams]);
  return [data, error];
};

export default useFetchData;

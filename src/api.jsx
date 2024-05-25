import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchData = ({ latitude, longitude, forecastDays, hourlyParams }) => {
  const [retrieved, setRetrieved] = useState(false);
  const [data, setData] = useState(null);
  const API_URL =
  `https://api.open-meteo.com/v1/gem?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams.join(",")}&forecast_days=${forecastDays}`;
  const sendRequest = async () => {
    setRetrieved(false);
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
        setRetrieved(true);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    sendRequest();
    const timer = setInterval(sendRequest, 10000);
    return () => clearInterval(timer);
  }, [latitude, longitude, forecastDays, hourlyParams]);
  const output = retrieved ? (
    <div>Data retrieved: {JSON.stringify(data)}</div>
  ) : (
    <div>Fetching data...</div>
  );
  return output;
};

export default FetchData;

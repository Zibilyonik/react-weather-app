import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchData = (latitude = 0, longitude = 0, forecastDays = 1, hourlyParams) => {
  const [retrieved, setRetrieved] = useState(false);
  const [data, setData] = useState(null);
  const hourlyParamsString = hourlyParams.join(",");
  const API_URL =
  `https://api.open-meteo.com/v1/gem?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParamsString}&forecast_days=${forecastDays}`;
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
  }, []);
  const output = retrieved ? (
    <div>Data retrieved: {JSON.stringify(data)}</div>
  ) : (
    <div>Fetching data...</div>
  );
  return output;
};

export default FetchData;

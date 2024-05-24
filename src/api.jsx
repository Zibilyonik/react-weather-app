import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
const FetchData = () => {
  const [retrieved, setRetrieved] = useState(false);
  const [data, setData] = useState(null);
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

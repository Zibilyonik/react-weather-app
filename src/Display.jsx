import FetchData from "./api";
import React, { useState } from "react";
import { Select, Checkbox, Input } from "antd";

const Display = () => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [forecastDays, setForecastDays] = useState("1");
  const [hourlyParams, setHourlyParams] = useState([]);
 
  return (
    <FetchData latitude={latitude} longitude={longitude} forecastDays={forecastDays} hourlyParams={hourlyParams} />
  )
};

export default Display;

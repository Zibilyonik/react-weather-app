import FetchData from "./api";
import React, { useState } from "react";
import { Select, Checkbox, Input } from "antd";

const Display = () => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [forecastDays, setForecastDays] = useState("1");
  const [hourlyParams, setHourlyParams] = useState([]);
  const onLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const onLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };
  const onForecastDaysChange = (value) => {
    setForecastDays(value);
  };
  const onHourlyParamsChange = (value) => {
    setHourlyParams(value);
  };
  return (
    <div>
      <div>
        <label>Latitude: </label>
        <Input
          type="number"
          size="small"
          value={latitude}
          onChange={onLatitudeChange}
        />
      </div>
      <div>
        <label>Longitude: </label>
        <Input
          type="number"
          size="small"
          value={longitude}
          onChange={onLongitudeChange}
        />
      </div>
      <div>
        <label>Forecast days: </label>
        <Select value={forecastDays} onChange={onForecastDaysChange}>
          <Select.Option default value={"1"}>
            1 (Default)
          </Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={7}>7</Select.Option>
        </Select>
      </div>
      <div>
        <label>Hourly parameters: </label>
        <Checkbox.Group value={hourlyParams} onChange={onHourlyParamsChange}>
          <Checkbox value="temperature_2m">Temperature</Checkbox>
          <Checkbox value="rain">Rain</Checkbox>
        </Checkbox.Group>
      </div>
      <FetchData
        latitude={latitude}
        longitude={longitude}
        forecastDays={forecastDays}
        hourlyParams={hourlyParams}
      />
    </div>
  );
};

export default Display;

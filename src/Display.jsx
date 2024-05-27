import useFetchData from "./api";
import React, { useEffect, useState } from "react";
import { Select, Checkbox, Input } from "antd";
import { Line } from "@ant-design/charts";
import cityOptions from "./cityOptions";

const Display = () => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [forecastDays, setForecastDays] = useState("1");
  const [hourlyParams, setHourlyParams] = useState([]);
  const data = useFetchData({
    latitude,
    longitude,
    forecastDays,
    hourlyParams,
  });
  useEffect(() => {
    console.log("data:", data);
  }, [data]);
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
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
      <Select
        showSearch
        placeholder="Select a city"
        optionFilterProp="children"
        onChange={(value) => {
          value = value.split(",");
          console.log("value:", value);
          setLatitude(value[0]);
          setLongitude(value[1]);
        }}
        onSearch={onSearch}
        filterOption={filterOption}
        options={cityOptions}
      />
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
      {data && data !== "waiting for data..." ? (
        <div>
          <Line
            data={data}
            xField="time"
            yField="temperature_2m"
            seriesField="city"
            color={["#1979C9", "#D62A0D"]}
            point={{ size: 5, shape: "diamond" }}
            label={{
              style: {
                fill: "#1979C9",
                fontSize: 14,
              },
            }}
          />
        </div>
      ) : (
        <div>Fetching data...</div>
      )}
    </div>
  );
};

export default Display;

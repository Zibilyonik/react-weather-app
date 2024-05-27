import useFetchData from "./api";
import React, { useEffect, useState } from "react";
import { Select, Checkbox, Input } from "antd";
import { DualAxes } from "@ant-design/charts";
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
  const [lineProps, setLineProps] = useState({});
  useEffect(() => {
    if (data.hourly) {
      const hourData = data.hourly.time || [];
      const rainData = data.hourly.rain || [];
      const temperatureData = data.hourly.temperature_2m || [];

      setLineProps({
        xField: "hour",
        data: hourData.map((hour, index) => ({
          hour: hour,
          temperature: temperatureData[index],
          rain: rainData[index],
        })),
        legend: {
          position: "top-right",
          color: {
            itemMarker: (v) => {
              if (v === "rain") return "rect";
              return "smooth";
            },
          },
        },
        children: [
          {
            type: "interval",
            yField: "rain",
            axis: { y: { position: "right" } },
          },
          {
            type: "area",
            yField: "temperature",
            shapeField: "smooth",
            scale: { color: { relations: [["temperature", "#fdae6b"]] } },
            axis: { y: { position: "left" } },
            areaStyle: () => ({ fill: "#fdae6b"}),
          },
        ],
      });
    }
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
      <div>
        <DualAxes {...lineProps} />
      </div>
    </div>
  );
};

export default Display;

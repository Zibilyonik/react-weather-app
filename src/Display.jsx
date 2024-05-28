import useFetchData from "./useFetchData";
import React, { useEffect, useState } from "react";
import { Select, Checkbox, Input, Alert } from "antd";
import { DualAxes } from "@ant-design/plots";
import cityOptions from "./cityOptions";

const Display = () => {
  const [latitude, setLatitude] = useState("41.02");
  const [longitude, setLongitude] = useState("28.98");
  const [loaded, setLoaded] = useState(false);
  const [forecastDays, setForecastDays] = useState("1");
  const [hourlyParams, setHourlyParams] = useState(["temperature_2m", "rain"]);
  const [lineProps, setLineProps] = useState({});
  const [data, error] = useFetchData({
    latitude,
    longitude,
    forecastDays,
    hourlyParams,
  });
  const onLatitudeChange = (e) => {
    setLoaded(false);
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
  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toFixed(2));
        setLongitude(position.coords.longitude.toFixed(2));
      });
    }
  }, []);
  useEffect(() => {
    setLoaded(false);
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
          position: "top-left",
          color: {
            itemMarker: (v) => {
              if (v === "rain") return "rect";
              return "smooth";
            },
          },
        },
        scale: { y: { nice: true } },
        children: [
          {
            type: "interval",
            yField: "rain",
            axis: {
              y: {
                position: "right",
                title: "Precipitation (mm)",
                titleFill: "#123456",
              },
            },
            scale: { y: { domainMax: Math.max(1, ...rainData) } },
            style: { fill: "#123456" },
          },
          {
            type: "line",
            yField: "temperature",
            shapeField: "smooth",
            axis: {
              y: {
                position: "left",
                title: "temperature (C)",
                titleFill: "#fdae6b",
              },
            },
            style: { lineWidth: 5, stroke: "#fdae6b" },
          },
        ],
      });
      setLoaded(true);
    }
  }, [data]);
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
        {error ? (
          <Alert
            message={error.message}
            description={`Error fetching data: ${error.response.status} ${error.response.statusText}`}
            type="error"
            closable
          />
        ) : loaded ? (
          <DualAxes {...lineProps} />
        ) : (
          <div>Waiting for data...</div>
        )}
      </div>
    </div>
  );
};

export default Display;

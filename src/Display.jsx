import useFetchData from "./useFetchData";
import React, { useEffect, useState } from "react";
import { Checkbox, Select, Alert } from "antd";
import {
  Container,
  StyledSelect,
  Section,
  DisplaySection,
  StyledLabel,
} from "./Display.styles";
import { DualAxes } from "@ant-design/plots";
import cityOptions from "./cityOptions";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [latitude, setLatitude] = useState("41.02");
  const [longitude, setLongitude] = useState("28.98");
  const [loaded, setLoaded] = useState(false);
  const [forecastDays, setForecastDays] = useState("1");
  const [city, setCity] = useState("istanbul");
  const [hourlyParams, setHourlyParams] = useState(["temperature_2m", "rain"]);
  const navigate = useNavigate();
  const [lineProps, setLineProps] = useState({});
  const [data, error] = useFetchData({
    latitude,
    longitude,
    forecastDays,
    hourlyParams,
  });
  const onForecastDaysChange = (value) => {
    setForecastDays(value);
  };
  const onHourlyParamsChange = (value) => {
    setHourlyParams(value);
    navigate(
      `/${city}${
        value.length === 0 ? "" : `?options=${value.join(",")}`
      }&forecast_days=${forecastDays}`
    );
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
      const humidityData = data.hourly.relative_humidity_2m || [];

      setLineProps({
        xField: "hour",
        data: hourData.map((hour, index) => ({
          hour: hour,
          temperature: temperatureData[index],
          rain: rainData[index],
          humidity: humidityData[index],
        })),
        legend: {
          visible: true,
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
          ...(hourlyParams.includes("rain")
            ? [
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
              ]
            : []),
          ...(hourlyParams.includes("relative_humidity_2m")
            ? [
                {
                  type: "area",
                  yField: "humidity",
                  shapeField: "smooth",
                  axis: {
                    y: {
                      position: "right",
                      title: "Humidity (%)",
                      titleFill: "#abcdef",
                    },
                  },
                  style: { lineWidth: 1, stroke: "#abcdef", fillOpacity: 0.2},
                },
              ]
            : []),
          {
            type: "line",
            yField: "temperature",
            shapeField: "smooth",
            axis: {
              y: {
                position: "left",
                title: "temperature (°C)",
                titleFill: "#fdae6b",
              },
            },
            style: { lineWidth: 5, stroke: "#fdae6b" },
          },
        ],
      });
      setLoaded(true);
    }
  }, [data, hourlyParams]);
  return (
    <Container>
      <StyledLabel>City: </StyledLabel>
      <StyledSelect
        showSearch
        placeholder="Select a city"
        optionFilterProp="children"
        onChange={(value, option) => {
          value = value.split(",");
          setLatitude(value[0]);
          setLongitude(value[1]);
          const newCity = option.label.toLowerCase();
          setCity(newCity);
          navigate(`/${newCity}?options=${hourlyParams.join(",")}`);
        }}
        filterOption={filterOption}
        options={cityOptions}
      />
      <Section>
        <StyledLabel>Forecast days: </StyledLabel>
        <StyledSelect value={forecastDays} onChange={onForecastDaysChange}>
          <Select.Option default value={"1"}>
            1 (Default)
          </Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={7}>7</Select.Option>
        </StyledSelect>
      </Section>
      <Section>
        <StyledLabel>Hourly parameters: </StyledLabel>
        <Checkbox.Group value={hourlyParams} onChange={onHourlyParamsChange}>
          <Checkbox value="temperature_2m">Temperature</Checkbox>
          <Checkbox value="rain">Rain</Checkbox>
          <Checkbox value="relative_humidity_2m">Humidity</Checkbox>
        </Checkbox.Group>
      </Section>
      <DisplaySection>
        {error ? (
          <Alert
            message={error.message}
            description={`Error fetching data: ${error.status} ${error.statusText}`}
            type="error"
            closable
          />
        ) : loaded ? (
          <DualAxes {...lineProps} />
        ) : (
          <Section>Waiting for data...</Section>
        )}
      </DisplaySection>
    </Container>
  );
};

export default Display;

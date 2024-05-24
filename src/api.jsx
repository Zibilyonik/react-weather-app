import React, {useState} from "react";
import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const FetchData = () => {
    const [retrieved, setRetrieved] = useState(false);
  axios
    .get(API_URL)
    .then((response) => {
      console.log(response.data);
        setRetrieved(true);
    })
    .catch((error) => {
      console.error(error);
    });
    const output = retrieved ? <div>Data retrieved</div> : <div>Fetching data...</div>;

  return output;
};

export default FetchData;

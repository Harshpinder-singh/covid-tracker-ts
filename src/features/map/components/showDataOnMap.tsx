import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors: { [k: string]: any } = {
  cases: {
    hex: "#cc1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

interface showDataOnMapProps {
  data: any[];
  casesType?: string;
}

const showDataOnMap = (data: any[], casesType = "cases") => {
  console.log("data", data);
  return data.map((country) => (
    <Circle
      center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <h1>hey</h1>
      </Popup>
    </Circle>
  ));
};

export default showDataOnMap;

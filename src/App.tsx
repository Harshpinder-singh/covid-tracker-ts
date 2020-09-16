import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { sortBy } from "lodash";

import InfoBox from "./features/dashboard/components/infoBox";

import "./app.css";
import Map from "./features/map/components/map";
import Table from "./features/table/components/table";
import LineGraph from "./features/graph/components/lineGraph";

import "leaflet/dist/leaflet.css";

interface countryObj {
  country: {
    country: string;
  };
  countryInfo: {
    iso2: string;
  };
}

interface countriesType {
  name: string;
  value: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Array<countriesType>>([]);
  const [country, setCountry] = useState<string | unknown>("worldwide");
  const [countryInfo, setCountryInfo] = useState<{ [k: string]: any } | null>(
    null
  );
  const [tableData, setTableData] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState<number>(3);
  const [mapCountries, setMapCountries] = useState<any[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await res.json();

      const countries = data.map((country: countryObj) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortBy(data, "cases").reverse();

      setCountries(countries);
      setTableData(sortedData);
      setMapCountries(data);
      await fetchCountryInfo(country);
    };
    getCountries();
  }, []);

  const onCountryChange = async (e: React.ChangeEvent<{ value: unknown }>) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    await fetchCountryInfo(countryCode);
  };

  const fetchCountryInfo = async (countryCode: string | unknown) => {
    const res = await fetch(
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    );

    const data = await res.json();

    setCountryInfo(data);
    if (data?.countryInfo) {
      setMapCenter({
        lat: data.countryInfo.lat,
        lng: data.countryInfo.long,
      });
      setMapZoom(4);
    }
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">World Wide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={(countryInfo || {}).todayCases}
            total={300}
          />
          <InfoBox
            title="Recovered"
            cases={(countryInfo || {}).todayRecovered}
            total={300}
          />
          <InfoBox
            title="Deaths"
            cases={(countryInfo || {}).todayDeaths}
            total={300}
          />
        </div>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

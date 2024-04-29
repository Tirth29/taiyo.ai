import React, { useState, useEffect } from "react";
import CovidImage from "./images/image.png";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./App.css";

import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

const Charts: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("Worldwild");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [lineGraphCountry, setLineGraphCountry] = useState("Worldwild");
  const [mapCenter, setMapCenter] = useState({
    lat: 24,
    lng: 54,
  });
  const [mapZoom, setMapZoom] = useState(2);
  const printCounts = (counts: number | undefined) => {
    if (counts) {
      return `+${numeral(counts).format("0.0a")}`;
    } else {
      return "+0";
    }
  };

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countryList = data.map(
            (country: { country: string; countryInfo: { iso2: string } }) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            })
          );
          setCountries(countryList);
          setMapCountries(data);
          setTableData(
            data.sort((a: { cases: number }, b: { cases: number }) =>
              a.cases > b.cases ? -1 : 1
            )
          );
        });
    };
    getCountriesData();
  }, []);

  const selectedCountry = async (event: { target: { value: string } }) => {
    const currentCountry = event.target.value;

    if (currentCountry === "Worldwild") {
      const url = "https://disease.sh/v3/covid-19/historical/all";
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          // setMapCenter([24, 54]);
          setMapZoom(6);
          setLineGraphCountry({ casesType: "", country: "Worldwild" });
        });
    } else {
      const url = `https://disease.sh/v3/covid-19/countries/${currentCountry}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          setMapCenter({
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          });
          setMapZoom(4);
          setLineGraphCountry(data.country);
        });
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <img src={CovidImage} alt="" className="app__covidImage" />
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={selectedCountry}
              value={selectCountry}
              className="mt-10"
            >
              <MenuItem value="Worldwild">Worldwild</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__states">
          <InfoBox
            isRed1
            active={casesType === "cases"}
            onClick={() => setCasesType("cases")}
            title="Coronovirus cases"
            cases={parseInt(printCounts(countryInfo.todayCases))}
            total={parseInt(printCounts(countryInfo.cases))}
            isRed={false}
          ></InfoBox>
          <InfoBox
            active={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
            title="Recovered"
            cases={parseInt(printCounts(countryInfo.todayRecovered))}
            total={parseInt(printCounts(countryInfo.recovered))}
            isRed={false}
            isRed1={false}
          ></InfoBox>
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
            title="Deaths"
            cases={parseInt(printCounts(countryInfo.todayDeaths))}
            total={parseInt(printCounts(countryInfo.deaths))}
            isRed1={false}
          ></InfoBox>
        </div>
        <Map
          casesType={casesType as "cases" | "recovered" | "deaths"}
          countries={mapCountries}
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapZoom}
        ></Map>
      </div>
      <div className="app__right">
        <Card className="app__right__card">
          <CardContent>
            {/* Table */}
            <p className="font-bold text-2xl">Total Cases by country</p>
            <div className="overflow-y-auto h-96 w-80 lg:w-96 lg:mx-80">
              <Table countries={tableData} />
            </div>
            {/* Graph */}
            <h3 className="graphTitle font-bold text-2xl">
              Total {casesType} in {lineGraphCountry}
            </h3>
            <LineGraph
              className="app__graph"
              country={lineGraphCountry}
              casesType={casesType}
            ></LineGraph>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Charts;

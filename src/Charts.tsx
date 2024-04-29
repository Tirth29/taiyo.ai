import React, { useState, useEffect } from "react";
import CovidImage from "./images/image.png";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
  const [mapCenter, setMapCenter] = useState({
    lat: 24,
    lng: 54,
  });
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");
  const printCounts = (counts: any) => {
    if (counts) {
      return `+${numeral(counts).format("0.0a")}`;
    } else {
      return "+0";
    }
  };
  const [lineGraphCountry, setLineGraphCountry] = useState("Worldwild");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countryList = data.map(
            (country: { country: any; countryInfo: { iso2: any } }) => ({
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

  const selectedCountry = async (event: { target: { value: any } }) => {
    const currentCountry = event.target.value;

    if (currentCountry === "Worldwild") {
      const url = "https://disease.sh/v3/covid-19/historical/all";
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          setMapCenter([24, 54]);
          setMapZoom(6);
          setLineGraphCountry("Worldwild");
        });
    } else {
      const url = `https://disease.sh/v3/covid-19/countries/${currentCountry}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
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
            className=""
            active={casesType === "cases"}
            onClick={(e: any) => setCasesType("cases")}
            title="Coronovirus cases"
            cases={printCounts(countryInfo.todayCases)}
            total={printCounts(countryInfo.cases)}
          ></InfoBox>
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e: any) => setCasesType("recovered")}
            title="Recovered"
            cases={printCounts(countryInfo.todayRecovered)}
            total={printCounts(countryInfo.recovered)}
          ></InfoBox>
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e: any) => setCasesType("deaths")}
            title="Deaths"
            cases={printCounts(countryInfo.todayDeaths)}
            total={printCounts(countryInfo.deaths)}
          ></InfoBox>
        </div>
        <Map
          className="app__left__map"
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
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

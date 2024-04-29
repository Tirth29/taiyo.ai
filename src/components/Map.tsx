import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

interface Country {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  recovered: number;
  deaths: number;
}

interface MapProps {
  countries: Country[];
  casesType: "cases" | "recovered" | "deaths";
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map bg-white p-4 rounded-md mt-4 shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{
          height: "500px",
          borderRadius: "20px",
          boxShadow: "0 0 8px -4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {casesType === "recovered" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"green"}
              fillColor={"green"}
              radius={Math.sqrt(country[casesType]) * 400}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag w-full h-28 bg-cover rounded-md"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  />
                  <div className="popup__country text-2xl font-bold text-gray-700">
                    {country.country}
                  </div>
                  <div className="popup__cases text-base mt-3">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered text-base mt-3">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths text-base mt-3">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        {casesType === "cases" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"red"}
              fillColor={"red"}
              radius={Math.sqrt(country[casesType]) * 300}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag w-full h-28 bg-cover rounded-md"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  />
                  <div className="popup__country text-2xl font-bold text-gray-700">
                    {country.country}
                  </div>
                  <div className="popup__cases text-base mt-3">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered text-base mt-3">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths text-base mt-3">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        {casesType === "deaths" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"#B82925"}
              fillColor={"#B82925"}
              radius={Math.sqrt(country[casesType]) * 1500}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag w-full h-28 bg-cover rounded-md"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  />
                  <div className="popup__country text-2xl font-bold text-gray-700">
                    {country.country}
                  </div>
                  <div className="popup__cases text-base mt-3">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered text-base mt-3">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths text-base mt-3">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;

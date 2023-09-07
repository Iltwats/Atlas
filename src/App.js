import React, { useState, useEffect } from "react";
import Search from "./component/Search";
import CountryCard from "./component/CountryCard";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const cachedData = localStorage.getItem("countryData");

  useEffect(() => {
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCountries(parsedData);
      setFilteredCountries(parsedData);
    } else {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          // Store data in localStorage
          localStorage.setItem("countryData", JSON.stringify(data));
          setCountries(data);
          setFilteredCountries(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredCountries([]);
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filteredCountries);
    }
  };

  const handleCountryCardClick = (clickedCountry) => {
    const linkUrl = clickedCountry.maps.openStreetMaps;
    window.open(linkUrl, "_blank");
  };

  return (
    <div className="App">
      <h1>Country Atlas</h1>
      <Search onSearch={handleSearch} />
      {searchQuery === "" ? (
        <div className="type-to-search">Type to search</div>
      ) : filteredCountries.length === 0 ? (
        <div className="no-results">No Results Found</div>
      ) : (
        <div className="country-list">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.cca2}
              country={country}
              onClick={handleCountryCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

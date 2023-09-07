import React from "react";

const CountryCard = ({ country , onClick}) => {

    const handleCardClick = () => {
        onClick(country); 
    };

    const languages = country.languages || {};
    const languageStrings = Object.values(languages);

    const currencies = country.currencies || {};
    const currencyStrings = Object.values(currencies).flatMap(Object.values)[0];

    return (
        <div className="country-card" onClick={handleCardClick}>
            <div className="country-flag-div">
                <img src={country.flags.png} alt={country.flags.alt} className="country-flag" />
            </div>
            <div className="country-about">
                <h3>{country.name.common}</h3>
                <p> {country.continents}</p>
            </div>
            <p>Capital: {country.capital}</p>
            {languageStrings.length > 0 && (
                <p>Languages: {languageStrings.join(', ')}</p>
            )}
            <p> Currency:{currencyStrings}</p>
            <div className="country-demographics">
                <p>{country.population}<br/>Population</p>
                <p>{country.area} km²<br/> Area</p>
            </div>
        </div>
    );
};

export default CountryCard; 
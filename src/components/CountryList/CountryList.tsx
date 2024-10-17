import React from "react";
import { Country } from "./types";

interface CountryListProps {
  countries: Country[];
  onCountryClick: (alpha3Code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  onCountryClick,
}) => {
  return (
    <ul className="list-group">
      {countries.map((country, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={country.alpha3Code}
          onClick={() => onCountryClick(country.alpha3Code)}
          style={{ cursor: "pointer" }}
        >
          {index + 1}. {country.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;

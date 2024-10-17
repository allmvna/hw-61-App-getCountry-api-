import React from "react";
import { DetailCountry } from "./types";

interface CountryDetailProps {
  detailCountry: DetailCountry | null;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ detailCountry }) => {
  if (!detailCountry) {
    return <div className="alert alert-info">Select a country</div>;
  }

  return (
    <div
      className="border p-3 rounded"
      style={{ height: "650px", overflowY: "auto" }}
    >
      <div className="d-flex align-items-center justify-content-between pb-4">
        <h3>{detailCountry.name}</h3>
        <img
          src={detailCountry.flags.svg}
          alt="flag"
          className="img-fluid mb-3 w-50"
        />
      </div>
      <p>
        <strong>Capital:</strong> {detailCountry.capital}
      </p>
      <p>
        <strong>Population:</strong> {detailCountry.population} p
      </p>
      <p>
        <strong>Region:</strong> {detailCountry.region}
      </p>
      <div>
        <strong>Bordering with:</strong>
        <ul>
          {detailCountry.borderNames && detailCountry.borderNames.length > 0 ? (
            detailCountry.borderNames.map((border, index) => (
              <li key={index}>{border}</li>
            ))
          ) : (
            <li>There are no borders.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryDetail;

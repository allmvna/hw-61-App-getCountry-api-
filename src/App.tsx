import "./App.css";
import { useEffect, useState } from "react";
import { Country, DetailCountry } from "./types";
import axios from "axios";
import {
  ALL_COUNTRY_URL,
  COUNTRY_DETAIL_URL,
  COUNTRY_FIELDS,
} from "./constants.ts";
import CountryList from "./components/CountryList/CountryList.tsx";
import Loader from "./UI/Loader.tsx";
import CountryDetail from "./components/CountryDetails/CountryDetails.tsx";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailCountry, setDetailCountry] = useState<DetailCountry | null>(
    null,
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios<Country[]>(ALL_COUNTRY_URL + COUNTRY_FIELDS);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const getCountry = async (alpha3Code: string) => {
    try {
      setLoading(true);
      const response = await axios<DetailCountry>(
        `${COUNTRY_DETAIL_URL}${alpha3Code}`,
      );
      setDetailCountry(response.data);

      const borderCountries = response.data.borders || [];
      const borderResponses = await Promise.all(
        borderCountries.map((borderCode) =>
          axios(`${COUNTRY_DETAIL_URL}${borderCode}`),
        ),
      );
      const borderNames = borderResponses.map(
        (borderResponse) => borderResponse.data.name,
      );
      setDetailCountry((prev) => (prev ? { ...prev, borderNames } : null));
    } catch (error) {
      console.error("Error fetching country details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-primary p-4 text-center text-white">
        <h3>Countries of the World</h3>
      </header>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-4">
            <div
              className="countries-block"
              style={{ maxHeight: "650px", overflowY: "auto" }}
            >
              {loading ? (
                <Loader />
              ) : (
                <CountryList
                  countries={countries}
                  onCountryClick={getCountry}
                />
              )}
            </div>
          </div>
          <div className="col-md-8">
            {loading && !detailCountry ? (
              <Loader />
            ) : (
              <CountryDetail detailCountry={detailCountry} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

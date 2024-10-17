import "./App.css";
import {useEffect, useState} from "react";
import {Country} from "./types";
import axios from "axios";
import {ALL_COUNTRY_URL, COUNTRY_FIELDS} from "./constants.ts";
import CountryList from "./components/CountryList/CountryList.tsx";
import Loader from "./UI/Loader.tsx";

const App = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios<Country[]>(ALL_COUNTRY_URL + COUNTRY_FIELDS);
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);


    return (
        <>
            <header className='bg-primary p-4 text-center text-white'>
                <h3>Countries of the World</h3>
            </header>
            {loading ? (
                <Loader/>
            ) : (
                <CountryList countries={countries}/>
            )}
        </>
    );
};

export default App;

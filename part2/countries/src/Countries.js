import { CountryViewBreif } from './CountryViewBreif';
import { CountryViewDetail } from './CountryViewDetail';

function filterCountries(country, searchCountries) {
    return country.name.common.toLowerCase().startsWith(searchCountries.toLowerCase());
}

export function Countries({ countries, searchCountries }) {

    if (searchCountries === '') {
        return countries
            .sort((a, b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
            .slice(0, 10)
            .map(country => <CountryViewBreif key={country.name.common} country={country} />);
    }
    const results = countries.filter(country => filterCountries(country, searchCountries));

    if (results.length === 0) {
        return <p>No such country, specify another filter</p>;
    }
    if (results.length === 1) {
        return <CountryViewDetail country={results[0]} />;
    }
    if (results.length <= 10) {
        results.map(country => country['show'] = false);
        return results.map(country => <CountryViewBreif key={country.name.common} country={country} />);
    }
    return <p>Too many matches, specify another filter</p>;
}

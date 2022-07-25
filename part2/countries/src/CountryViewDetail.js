import { Weather } from './Weather';

function CountryFlag({ country }) {
    const alt = `${country.name.common}_flag`;
    return <img alt={alt} src={country.flags.png} />;
}

function Language({ language_value }) {
    return <li>{language_value}</li>;
}

function Languages({ country }) {
    return Object.entries(country.languages).map(lang => <Language key={lang[0]} language_value={lang[1]} />);
}

export function CountryViewDetail({ country }) {
    return <>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>Langauge</h3>
        <Languages country={country} />
        <CountryFlag country={country} />
        <Weather country={country} />
    </>;
}

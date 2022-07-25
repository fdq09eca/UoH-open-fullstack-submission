import { useState } from 'react';
import { CountryViewDetail } from "./CountryViewDetail";

export function ShowButton({ country }) {
    const [show, setShow] = useState(false);
    if (show === false) {
        return <button onClick={() => { setShow(true); }}>show</button>;
    } else {
        return <>
            <button onClick={() => { setShow(false); }}>hide</button>
            <CountryViewDetail country={country} />
        </>;
    }
}

export function CountryViewBreif({ country }) {
    return <div>{country.name.common} <ShowButton country={country} /></div>;
}

import { useState, useEffect } from 'react'

const Countries = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        const resp = await fetch('http://localhost:8000/countries');
        const respJson = await resp.json();
        setData(respJson);
    };

    useEffect(() => {
        getData();
    }, [])

    const countries = data.map(country => {
        return (
            <div key={country.id}>
                <p>{country.country_name}, {country.country_code}</p>
            </div>
        )
    });

    return (
        <div className="countries">
            {countries}
        </div>
    )

}

export default Countries
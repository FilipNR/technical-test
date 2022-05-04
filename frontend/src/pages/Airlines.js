import { useState, useEffect } from 'react';
import { Button, Modal } from '@mantine/core';
import axios from 'axios';

const Airlines = () => {
    const [countries, setCountries] = useState([]);
    const [data, setData] = useState([]);
    const getCountries = async () => {
        const resp = await fetch(`https://airportmaps-backend.herokuapp.com/countries`)
        const respJson = await resp.json();
        setCountries(respJson);
    };

    const getData = async () => {
        const resp = await fetch('https://airportmaps-backend.herokuapp.com/airlines')
        const respJson = await resp.json();
        setData(respJson);
    };

    useEffect(() => {
        getCountries();
        getData();
    }, []);

    const [opened, setOpened] = useState(false);
    const [airlineId, setAirlineId] = useState();

    const editAirline = async (id, e) => {
        const name = e.target[0].value;
        const country = e.target[1].value;
        e.preventDefault();
        // window.location.reload(); // Doesn't work on Heroku, needs to wait for response
        // console.log(name, country)
        axios.put(`https://airportmaps-backend.herokuapp.com/airlines/${id}`, {
            name,
            country
        });
    }

    const deleteAirline = async (id, e) => {
        e.preventDefault();
        axios.delete(`https://airportmaps-backend.herokuapp.com/airlines/${id}`);
        let tempData = data.filter(val => {
            return val.id !== id // Filter the deleted marker
        });
        setData(tempData);
    };

    return (
        <>
            <form action="https://airportmaps-backend.herokuapp.com/airlines" method="post">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" required />
                <label htmlFor="country">Country:</label>
                <input type="text" name="country" list="country" required />
                <datalist id="country">
                    {countries.map(country => {
                        return <option key={country.id} value={country.country_name}></option>
                    })}
                </datalist>
                <input type="submit" />
            </form>
            <Modal opened={opened} onClose={() => setOpened(false)}>
                <form onSubmit={(e) => editAirline(airlineId, e)}>
                    <label htmlFor="name">Airline name: </label>
                    <input type="text" name="name" required />
                    <label htmlFor="country">Country: </label>
                    <input type="text" name="country" list="country" required />
                    <input type="submit" />
                    <datalist id="country">
                        {countries.map(country => {
                            return <option key={country.id} value={country.country_name}></option>
                        })}
                    </datalist>
                </form>
            </Modal>
            <div className="airport-list">
                {data.map(airline => {
                    return (
                        <div key={airline.id} style={{ marginBottom: '1em' }}>
                            {airline.name} | {airline.country}
                            <Button onClick={() => {
                                setOpened(!opened);
                                setAirlineId(airline.id);
                            }}>Edit</Button>
                            <Button color="red" onClick={(e) => {
                                deleteAirline(airline.id, e);
                            }}>Delete</Button>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Airlines
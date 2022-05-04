import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from '@mantine/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';

const Airports = () => {
    const center = {
        lat: 51.505,
        lng: -0.09,
    }

    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);

    const getData = async () => {
        const resp = await fetch('https://airportmaps-backend.herokuapp.com/airports');
        const respJson = await resp.json();
        setData(respJson);
    };

    const getCountries = async () => {
        const resp = await fetch('https://airportmaps-backend.herokuapp.com/countries');
        const respJson = await resp.json();
        setCountries(respJson);
    };

    useEffect(() => {
        getData();
        getCountries();
    }, []);

    const [opened, setOpened] = useState(false);
    const [markerId, setMarkerId] = useState();

    const editAirport = async (id, e) => {
        const name = e.target[0].value;
        const country = e.target[1].value;
        e.preventDefault();
        // window.location.reload();
        console.log(e)
        axios.put(`https://airportmaps-backend.herokuapp.com/airports/${id}`, {
            name,
            country
        });
    }

    const deleteAirport = async (id, e) => {
        e.preventDefault();
        axios.delete(`https://airportmaps-backend.herokuapp.com/airports/${id}`);
        let tempData = data.filter(val => {
            return val.id !== id // Filter the deleted marker
        });
        setData(tempData)
    };

    return (
        <div className='leaflet-container'>
            {/* Popup modal */}
            <Modal opened={opened} onClose={() => setOpened(false)}>
                <form onSubmit={(e) => editAirport(markerId, e)}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required />
                    <label htmlFor="country">Country: </label>
                    <input type="text" name="country" list="country" required />
                    <input type="submit" />
                    <datalist id="country"> {/* Datalist of countries, displays them on country input */}
                        {countries.map(country => {
                            return <option key={country.id} value={country.country_name}></option>
                        })}
                    </datalist>
                </form>
            </Modal>
            {/* Leaflet map container */}
            <MapContainer center={center} zoom={5} style={{ zIndex: 1, width: '100%', height: '90vh' }}
                zoomControl={window.innerWidth <= 1000 ? false : true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                />
                {data.map(marker => {
                    const { latitude, longitude } = marker;
                    return (
                        <Marker key={marker.id}
                            position={[latitude, longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                            <Popup>
                                <div>
                                    <p>Airport "{marker.name}"</p>
                                    <p>Country: "{marker.country}"</p>
                                    <p>Latitude: "{marker.latitude}"</p>
                                    <p>Longitude: "{marker.longitude}"</p>
                                    {marker.airlines && <p>Airlines: "{marker.airlines}"</p>}
                                    <Button size="xs" onClick={() => {
                                        setMarkerId(marker.id); // Set marker id
                                        setOpened(!opened); // Open modal
                                    }}>Edit</Button>
                                    <Button size="xs" color="red" onClick={(e) => deleteAirport(marker.id, e)}>Delete</Button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer >
        </div>
    )
}

export default Airports
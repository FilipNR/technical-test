import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import DraggableMarker from '../DraggableMarker';

const Airports = () => {
    const [data, setData] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const getData = async (link) => {
        const resp = await fetch('https://airportmaps-backend.herokuapp.com/countries');
        const respJson = await resp.json();
        setData(respJson);
    };

    const getAirlines = async (link) => {
        const resp = await fetch('https://airportmaps-backend.herokuapp.com/airlines');
        const respJson = await resp.json();
        setAirlines(respJson);
    };

    useEffect(() => {
        getData();
        getAirlines();
    }, [])

    const center = {
        lat: 51.505,
        lng: -0.09,
    }

    const [position, setPosition] = useState(center) // Marker position, used to input latitude and longitude of airport
    return (
        <>
            <form action="https://airportmaps-backend.herokuapp.com/airports" method="post">
                <label htmlFor="airport_name">Airport name: </label>
                <input type="text" name="airport_name" required />
                <label htmlFor="country">Airport country: </label>
                <input type="text" name="country" list="country_name" required />
                <label htmlFor="airlines">Airlines: </label>
                <input type="text" name="airlines" list="airlines" />
                <input type="text" name="latitude" value={position.lat} />
                <input type="text" name="longitude" value={position.lng} />
                <h4>Move the marker to the airport location</h4>
                <datalist id="country_name">
                    {data.map(airport => {
                        return <option key={airport.id} value={airport.country_name} />
                    })}
                </datalist>
                <datalist id="airlines">
                    {airlines.map(airline => {
                        return <option key={airline.id} value={airline.name} />
                    })}
                </datalist>
                <div className='leaflet-container'>
                    <MapContainer center={center} zoom={window.innerWidth <= 1000 ? 6 : 7} style={{ zIndex: 1, width: '70em', height: '46em' }}
                        zoomControl={window.innerWidth <= 1000 ? false : true} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                        />
                        <DraggableMarker position={position} setPosition={setPosition} /> {/* Pass position to marker */}
                    </MapContainer >
                </div>
                <input type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default Airports
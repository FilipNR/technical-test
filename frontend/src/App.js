import { useState } from 'react';
import { HeaderResponsive } from './Header';
import { links } from './Links';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import Airlines from './pages/Airlines';
import Airports from './pages/Airports';
import AirportCreate from './pages/AirportCreate';
import Countries from './pages/Countries';
import NoPage from './pages/NoPage'



function App() {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={HeaderResponsive(links)}>
          <Route index element={<Airports />}></Route>
          <Route path="airlines" element={<Airlines />}></Route>
          <Route path="create/airport" element={<AirportCreate airports={data} />}></Route>
          <Route path="countries" element={<Countries />}></Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

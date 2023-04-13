import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import Update from './Update';
import Read from './Read';
import CreateDog from './CreateDog';

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await axios.get('/api/dogs');
      setDogs(response.data);
    };
    fetchDogs();
  }, []);

  const handleCreateDog = async (dog) => {
    const response = await axios.post('/api/dogs', dog);
    setDogs([...dogs, response.data]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home dogs={dogs} />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
        <Route
          path="/CreateDog/"
          element={<CreateDog handleCreateDog={handleCreateDog} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

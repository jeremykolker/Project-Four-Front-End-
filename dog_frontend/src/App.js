import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import Update from './Update';
import Read from './Read';
import CreateDog from './CreateDog';


const App = () => {
  const [dog, setDog] = useState([]);

  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/dog/' + event.target.value)
      .then((response) => {
        getDog();
      })
      .catch((error) => console.error(error));
  };

  const handleCreate = (addDog) => {
    axios
      .post('http://localhost:8000/api/dog', addDog)
      .then((response) => {
        console.log(response);
        getDog();
      })
      .catch((error) => console.error(error));
  };


  const getDog = () => {
    axios
      .get('http://localhost:8000/api/dog')
      .then(
        (response) => setDog(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };

  const handleUpdate = (editDog) => {
    console.log(editDog);
    axios
      .put('http://localhost:8000/api/dog/' + editDog.id, editDog)
      .then((response) => {
        getDog();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDog();
  }, []);



  return (
    <>
      <h1>Doggy Dog World</h1>
      <CreateDog handleCreate={handleCreate} />
      <div className="dogs">
        {dog.map((dog) => {
          return (
            <div className="card" key={dog.id}>
              <div className="card-header">
                <h5>Name: {dog.name}</h5>
                <h5>Birthday: {dog.birthday}</h5>
                <h5>Age: {dog.age}</h5>
                <h5>Breed: {dog.breed}</h5>
                <h5>Weight: {dog.weight}</h5>
              
              </div>
              <div className="card-body">
                <Update handleUpdate={handleUpdate} dog={dog} />
                <button onClick={handleDelete} value={dog.id}>
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/CreateDog/" element={<CreateDog handleCreate={handleCreate} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
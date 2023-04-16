import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add.js';
import Edit from './components/Edit.js';
import { Dropdown } from 'react-bootstrap';

const App = () => {
  let [dog, setDog] = useState([]);
  let [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDog, setFilteredDog] = useState([])

  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/dog/' + event.target.value)
      .then((response) => {
        getDog()
      })
  }

  const handleCreate = (addItem) => {
    axios.post('http://localhost:8000/api/dogs', addItem).then((response) => {
      console.log(response);
      getDog();
    });
  };

  const getDog = () => {
    axios
      .get('http://localhost:8000/api/dogs')
      .then((response) => {
        setDog(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (editDog) => {
    console.log(editDog);
    axios.put('http://localhost:8000/api/dogs/' + editDog.id, editDog).then((response) => {
      getDog();
    });
  };

  useEffect(() => {
    getDog();
  }, []);

  useEffect(() => {
    setFilteredDog(
      dog.filter((dog) => dog.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [dog, searchTerm])

  const sortByName = () => {
    setSortBy('name');
    setDog([...dog].sort((a, b) => (a.name > b.name ? 1 : -1)));
    setMenuOpen(false);
  };

  const sortByWalkTime = () => {
    setSortBy('walk_time');
    setDog([...dog].sort((a, b) => (a.walk_time > b.walk_time ? 1 : -1)));
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      
      <div className="menu-container" ref={menuRef}>
        <div className="menu-header" onClick={handleMenuClick}>
          <h2> ≡ </h2>
          {menuOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
        </div>
        {menuOpen && (
          <div className="menu-body">
            <button onClick={sortByName}>Sort By Name</button>
            <button onClick={sortByWalkTime}>Sort By Walk-Time</button>
          </div>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <h1>Doggy Dog World</h1>
   
      <div className="add">
        <h2>Add Dog</h2>
        <Add handleCreate={handleCreate} />
      </div>
      <div className="items">
        {dog.map((dog) => {
          return (
            <div className="card" key={dog.id}>
              <h5>Name: {dog.name}</h5>
              <h5>Age: {dog.age}</h5>
              <h5>Breed: {dog.breed}</h5>
              <h5>Walk Time: {dog.walk_time}</h5>
              <h5>Feeding Instructions: {dog.feeding_instructions}</h5>
              <div className="edit">
                <Edit handleUpdate={handleUpdate} dog={dog} />
              </div>
              <button onClick={handleDelete} value={dog.id}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;

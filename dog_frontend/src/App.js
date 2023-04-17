import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Add from './components/Add.js';
import Edit from './components/Edit.js';
import { Container, Row, Col, Card, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import dogImage from './Doggydogworld2.png';


const App = () => {
  let [dog, setDog] = useState([]);
  let [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDog, setFilteredDog] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = (event) => {
    axios.delete('http://localhost:8000/api/dogs/' + event.target.value).then((response) => {
      getDog();
    });
  };

  const handleCreate = (addDog) => {
    axios.post('http://localhost:8000/api/dogs', addDog).then((response) => {
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
    setFilteredDog(dog.filter((dog) => dog.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [dog, searchTerm]);

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

  const menuRef = useRef(null);

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
    
      <div className="menu-container" ref={menuRef} onClick={handleMenuClick}>
        <div className="menu-body">
          ≡
          {menuOpen && (
            <>
              <button className="top-button" onClick={sortByName}>
                Sort By Name
              </button>
              <button onClick={sortByWalkTime}>Sort By Time</button>
            </>
          )}
        </div>
      </div>

      <div>
      <img src={dogImage} alt="A cute dog" />
      </div>

      <div className="search-bar my-3">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search For Dog"
            aria-label="Search For Dog"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </div>

      <div className="add my-3">
        <h2 className="text-light">Add Dog</h2>
        <Add handleCreate={handleCreate} />
      </div>

      <Container>
        <Row>
          {filteredDog.map((dog) => {
            return (
              <Col md={6} lg={4} className="my-3" key={dog.id}>
                <Card classname="dogpic">
                  <Card.Img
                    className="card-images"
                    variant="top"
                    src={dog.photo_url}
                    crossOrigin="anonymous"
                  />

                  <Card.Body>
                    <Card.Title>Name: {dog.name}</Card.Title>
                    <Card.Text>Age: {dog.age}</Card.Text>
                    <Card.Text>Breed: {dog.breed}</Card.Text>
                    <Card.Text>Walk Time: {dog.walk_time}</Card.Text>
                    <Card.Text>
                      Feeding Instructions: {dog.feeding_instructions}
                    </Card.Text>
                    <div className="edit">
                      <Edit handleUpdate={handleUpdate} dog={dog} />
                    </div>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      value={dog.id}
                    >
                      X
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};


export default App;
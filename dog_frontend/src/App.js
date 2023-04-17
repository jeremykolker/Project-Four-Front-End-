import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Add from './components/Add.js';
import Edit from './components/Edit.js';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import dogImage from './Doggydogworld2.png';

// USESTATE HOOKS FOR DOG OBJECT DATA, SORT FUNCTIONS, & MENU/FORM TOGGLING \\ 
const App = () => {
  let [dog, setDog] = useState([]);
  let [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDog, setFilteredDog] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addDogVisible, setAddDogVisible] = useState(false);
  const [showAddDog, setShowAddDog] = useState(false);

   // CREATE FUNCTION \\
   const handleCreate = (addDog) => {
    axios.post('http://localhost:8000/api/dogs', addDog).then((response) => {
      console.log(response);
      getDog();
      setAddDogVisible(false);
    });
  };

  // READ FUNCTION \\
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

// EDIT FUNCTION \\
  const handleUpdate = (editDog) => {
    console.log(editDog);
    axios.put('http://localhost:8000/api/dogs/' + editDog.id, editDog).then((response) => {
      getDog();
    });
  };

  // DELETE FUNCTION \\
  const handleDelete = (event) => {
    axios.delete('http://localhost:8000/api/dogs/' + event.target.value).then((response) => {
      getDog();
    });
  };

 
// SORT BY DOG NAME FUNCTION \\
  const sortByName = () => {
    setSortBy('name');
    setDog([...dog].sort((a, b) => (a.name > b.name ? 1 : -1)));
    setMenuOpen(false);
  };

  // SORT BY WALK TIME FUNCTION \\
  const sortByWalkTime = () => {
    setSortBy('walk_time');
    setDog([...dog].sort((a, b) => (a.walk_time > b.walk_time ? 1 : -1)));
    setMenuOpen(false);
  };

  // TOGGLE NAV MENU \\
  const menuRef = useRef(null);
  const addDogRef = useRef(null);

  // CLICK EVENT TO OPEN NAV MENU \\
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setAddDogVisible(false);
  };

  // CLICK EVENT TO TRIGGER ADD-DOG FORM \\
  const handleAddDogClick = () => {
    setAddDogVisible(!addDogVisible);
    setMenuOpen(false);
  };

  // CLICK EVENT TO CLOSE MENU/FORMS \\
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
    if (addDogRef.current && !addDogRef.current.contains(event.target)) {
      setAddDogVisible(false);
    }
  };

  // USE EFFECT TO CLOSE NAV MENU WHEN USER CLICKS OUTSIDE MENU CONTAINER \\
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // USEEFFECT SEARCH FUNCTION \\
  useEffect(() => {
    setFilteredDog(dog.filter((dog) => dog.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [dog, searchTerm]);

  // USEEFFECT TO DISPLAY DOG OBJECTS \\
  useEffect(() => {
    getDog();
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
            
              <button onClick={() => setShowAddDog(!showAddDog)}>Add Dog</button>
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
        <br></br>
      </div>

      {showAddDog && (
        <div className="add my-3">
          <h2 className="text-light">Add Dog</h2>
          <Add handleCreate={handleCreate} />
        </div>
      )}

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
                    <br></br>
                    <br></br>
                    <br></br>
                    <Card.Title className="mt-3">&nbsp; Name: {dog.name}</Card.Title>
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
      <h4>Doggy Dog World &copy; 2023</h4>
    </>
  );

};

export default App;
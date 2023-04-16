import React, { useState } from 'react';

const Add = (props) => {
  const [dog, setDog] = useState({
    name: '',
    breed: '',
    age: '',
    walk_time: '',
    feeding_instructions: ''
  });

  const handleChange = (event) => {
    setDog({ ...dog, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreate(dog);
    setDog({
      name: '',
      breed: '',
      age: '',
      walk_time: '',
      feeding_instructions: ''
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={dog.name} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="breed">Breed: </label>
        <input type="text" name="breed" value={dog.breed} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" value={dog.age} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="walk_time">Walk Time: </label>
        <input type="time" name="walk_time" value={dog.walk_time} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="feeding_instructions">Feeding Instructions: </label>
        <input
          type="text"
          name="feeding_instructions"
          value={dog.feeding_instructions}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Add;

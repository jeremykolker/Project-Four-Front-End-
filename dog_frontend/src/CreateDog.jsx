import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateDog = ({ handleCreate }) => {
  const [dog, setDog] = useState({
    name: '',
    birthday: '',
    age: '',
    breed: '',
    weight: '',
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setDog({ ...dog, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreate(dog);
    setDog({
        name: '',
        birthday: '',
        age:'',
        breed: '',
        weight: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" value={dog.name} onChange={handleChange} />
      <br />
      <br />
      <label htmlFor="birthday">birthday: </label>
      <input type="text" name="birthday" value={dog.name} onChange={handleChange} />
      <br />
      <br />
      <label htmlFor="age">age: </label>
      <input type="text" name="age" value={dog.name} onChange={handleChange} />
      <br />
      <br />
      <label htmlFor="breed">Breed: </label>
      <input type="text" name="breed" value={dog.breed} onChange={handleChange} />
      <br />
      <br />
      <label htmlFor="weight">Weight: </label>
      <input type="number" name="weight" value={dog.weight} onChange={handleChange} />
      <br />
      <br />
    
      <input type="submit" />
    </form>
  );
};

export default CreateDog;
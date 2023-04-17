import React, { useState } from 'react';

const Add = (props) => {
  const [dog, setDog] = useState({
    name: '',
    breed: '',
    age: '',
    walk_time: '',
    feeding_instructions: '',
    photo_url: ''
  });

  const handleChange = (event) => {
    setDog({ ...dog, [event.target.name]: event.target.value });
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', dog.name);
    formData.append('breed', dog.breed);
    formData.append('age', dog.age);
    formData.append('walk_time', dog.walk_time);
    formData.append('feeding_instructions', dog.feeding_instructions);
    formData.append('photo_url', dog.photo_url);
    props.handleCreate(formData);
    setDog({
      name: '',
      breed: '',
      age: '',
      walk_time: '',
      feeding_instructions: '',
      photo_url: ''
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
        <label htmlFor="photo_url">Photo URL: </label>
        <input type="url" name="photo_url" value={dog.photo_url} onChange={handleChange} />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Add;

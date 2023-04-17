import React, { useState } from 'react';

const Edit = (props) => {
  const [dog, setDog] = useState({ ...props.dog });

  const handleChange = (event) => {
    setDog({ ...dog, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdate(dog);
  };

  return (
    <>
      <details>
        <br></br>
        <summary>Edit Doggy Info</summary>
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
      </details>
    </>
  );
};

export default Edit;

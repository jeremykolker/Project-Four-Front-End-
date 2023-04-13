import React, { useState, useEffect } from 'react'

const Add = (props) => {
  let emptyDog = { name: '', breed: '', weight: '', birthdate: '' }
  const [dog, setDog] = useState(emptyDog)

  const handleChange = (event) => {
    setDog({ ...dog, [event.target.name]: event.target.value })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(dog)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="breed">Breed: </label>
        <input
          type="text"
          name="breed"
          value={dog.breed}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="weight">Weight: </label>
        <input
          type="number"
          name="weight"
          value={dog.weight}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="birthdate">Birthdate: </label>
        <input
          type="date"
          name="birthdate"
          value={dog.birthdate}
          onChange={handleChange}
        />
        <br />
        <br />
    
        <input type="submit" />
      </form>
    </>
  )
}

export default Add

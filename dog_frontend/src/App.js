import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
const App = () => {
  let [dog, setDog] = useState([])
  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/dog/' + event.target.value)
      .then((response) => {
        getDog()
      })
  }
  const handleCreate = (addDog) => {
    axios
      .post('http://localhost:8000/api/dog', addDog)
      .then((response) => {
        console.log(response)
        getDog()
      })
  }
  const getDog = () => {
    axios
      .get('http://localhost:8000/api/dog')
      .then(
        (response) => setDog(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  const handleUpdate = (editDog) => {
    console.log(editDog)
    axios
      .put('http://localhost:8000/api/dog/' + editDog.id, editDog)
      .then((response) => {
        getDog()
      })
  }
  useEffect(() => {
    getDog()
  }, [])
  return (
    <>
      <h1>Doggy Dog World</h1>
      <Add handleCreate={handleCreate} />
      <div className="dogs">
        {dog.map((dog) => {
          return (
            <div className="card" key={dog.id}>
              <div className="card-header">
                <h5>Name: {dog.name}</h5>
                <h5>Breed: {dog.breed}</h5>
                <h5>Weight: {dog.weight}</h5>
                <h5>Birthdate: {dog.birthdate}</h5>
              </div>
              <div className="card-body">
                <Edit handleUpdate={handleUpdate} dog={dog} />
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
}
export default App;
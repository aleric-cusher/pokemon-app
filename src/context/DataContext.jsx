import React, { createContext, useState, useEffect } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // Fetch data from the API and set it to the state
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1010')
      .then(response => response.json())
      .then(data => setPokemons(data)) // need to change
      .catch(error => console.log(error))
  }, [])

  return (
    <DataContext.Provider value={pokemons}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }

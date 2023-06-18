import React, { createContext, useState, useEffect } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([])

  const updatePokemonList = (data) => {
    setPokemonList(data)
  }

  let contextData = {
    pokemonList: pokemonList,
    updatePokemonList: updatePokemonList
  }

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }

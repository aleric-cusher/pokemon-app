import React, { createContext, useState, useEffect } from 'react'
import pokemonShuffler from '../utils/pokemonShuffler'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([])
  const [searchLoad, setSearchLoad] = useState(10)

  const updatePokemonList = (data) => {
    setPokemonList(data)
  }

  const updateSearchLoad = (value) => {
    setSearchLoad(value)
  }

  let contextData = {
    pokemonList: pokemonList,
    updatePokemonList: updatePokemonList,
    searchLoad: searchLoad,
    updateSearchLoad: updateSearchLoad
  }

  const getPokemons = async () => {
    if(pokemonList.length < 1){
      let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
      if (response.status !== 200){
        showError('Something went wrong with fetching data!')
        console.log(response.statusText)
      } else {
        let data = await response.json()
        let pokemons = data.results
        pokemons.map((item) => {
          item.id = parseInt(item.url.split('/')[6], 10)
          // console.log(item.url.split('/')[6]) 
        })
        // pokemons = pokemonShuffler(pokemons)
        updatePokemonList(pokemons)
      }
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }

import React, { createContext, useState, useEffect } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([])
  const [filters, setFilters] = useState([
    {name: 'color', url: 'https://pokeapi.co/api/v2/pokemon-color/'},
    {name: 'habitat', url: 'https://pokeapi.co/api/v2/pokemon-habitat/'},
    {name: 'ability', url: 'https://pokeapi.co/api/v2/ability/'},
    {name: 'shape', url: 'https://pokeapi.co/api/v2/pokemon-shape/'},
    {name: 'egg group', url: 'https://pokeapi.co/api/v2/egg-group/'}
  ])

  const updatePokemonList = (data) => {
    setPokemonList(data)
  }

  const updateFilters = (value) => {
    setFilters(value)
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
          item.id = parseInt(item.url.split('/').at(-2), 10)
          // console.log(item.url.split('/').at(-2))
        })
        setPokemonList(pokemons)
      }
    }
  }
  
  let contextData = {
    pokemonList: pokemonList,
    updatePokemonList: updatePokemonList,
    filters: filters,
    updateFilters: updateFilters
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

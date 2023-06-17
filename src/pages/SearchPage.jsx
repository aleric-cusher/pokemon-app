import React, { useState, useEffect, useContext } from 'react'
import { Box, CircularProgress} from '@mui/material'
import SearchBar from '../components/SearchBar'
import { DataContext } from '../context/DataContext'
import pokemonShuffler from '../utils/pokemonShuffler'
import { ErrorContext } from '../context/ErrorContext'

// todo
// make component for searched pokemon
// handle error popup for api request
// make listings component
// figure out pagination
// figure out loading thing on search

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const { pokemonList, updatePokemonList} = useContext(DataContext)
  const { showError } = useContext(ErrorContext)

  const handleSearch = () => {
    console.log('called handle search')
  }

  const updateSearchTerm = (value) => {
    setSearchTerm(value)
  }

  const getPokemons = async () => {
    if(!pokemonList){
      let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
      let data = await response.json()
      if (response.status === 200){
        const pokemons = pokemonShuffler(data.results)
        updatePokemonList(pokemons)
      } else {
        showError('Something went wrong with fetching data!')
        console.log(response.statusText)
      }
    }
    // emulate 2 second loading time
    // await new Promise(r => setTimeout(r, 2000)) 
    // console.log('waited 5s')
    setLoading(false)
  }

  useEffect(() => {
    getPokemons()
  }, [])


  if(loading){
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh', // Adjust the height as needed
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ mt: '10px' }}>
      <SearchBar 
        query={searchTerm}
        suggestionsArray={pokemonList.map(item => item.name)}
        handleSearch={handleSearch}
        setQuery={updateSearchTerm}
      />
    </Box>
  )
}

export default SearchPage

import React, { useState, useEffect, useContext } from 'react'
import { Box, CircularProgress} from '@mui/material'
import SearchBar from '../components/SearchBar'
import { DataContext } from '../contexts/DataContext'
import pokemonShuffler from '../utils/pokemonShuffler'
import { ErrorContext } from '../contexts/ErrorContext'
import ListingComponent from '../components/ListingComponent'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(null)

  const { pokemonList, updatePokemonList, searchLoad, updateSearchLoad} = useContext(DataContext)
  const { showError } = useContext(ErrorContext)

  const handleSearch = (value=null) => {
    if(value){
      setShowSearch(value)
    } else {
      setShowSearch(searchTerm)
    }
  }

  const updateSearchTerm = (value) => {
    setSearchTerm(value)
  }

  const getPokemons = async () => {
    // emulate 2 second loading time
    // await new Promise(r => setTimeout(r, 2000)) 
    // console.log('waited 2s')
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
    setLoading(false)
  }
  
  useEffect(() => {
    getPokemons()
  }, [])


  if(loading && pokemonList.length < 1){
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ mt: '15px', mb: '15px' }}>
        <SearchBar 
          query={searchTerm}
          suggestionsArray={pokemonList.map(item => item.name)}
          handleSearch={handleSearch}
          setQuery={updateSearchTerm}
        />
      </Box>

      {showSearch && (
        <Box marginBottom="10px">
          <ListingComponent identifiers={[showSearch]} />
        </Box>
      )}
        

      <Box borderTop="5px solid grey" paddingTop="5px">
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ListingComponent
            identifiers={pokemonList.map(item => item.id)}
            loadMore={true}
            initialLoad={searchLoad}
            updateInitialLoad={updateSearchLoad}
          />
        )}
      </Box>
    </>
  )
}

export default SearchPage

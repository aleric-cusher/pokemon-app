import React, { useState, useEffect, useContext } from 'react'
import { Box, CircularProgress} from '@mui/material'
import SearchBar from '../components/SearchBar'
import { DataContext } from '../contexts/DataContext'
import pokemonShuffler from '../utils/pokemonShuffler'
import { ErrorContext } from '../contexts/ErrorContext'
import ListingComponent from '../components/ListingComponent'
import FilterOptions from '../components/FilterOptions'
import ListingPage from './ListingPage'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(null)

  const { pokemonList } = useContext(DataContext)
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
        
      <Box borderTop='2px solid grey' paddingTop='20px'>
        <ListingPage />
      </Box>
    </>
  )
}

export default SearchPage

import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'


const SearchBar = ({ query, suggestionsArray, setQuery, handleSearch }) => {
  const [suggestions, setSuggestions] = useState([])
  const suggestionsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleInputChange = (event) => {
    const value = event.target.value
    setQuery(value)
    const filteredSuggestions = suggestionsArray.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )
    setSuggestions(filteredSuggestions.slice(0, 8))
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setSuggestions([])
    handleSearch(suggestion)
  }

  return (
    <div style={{ position: 'relative', zIndex: 5, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        onKeyUp={(event) => {
            if(event.key === 'Enter'){
                handleSearch()
            }
        }}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </>
          ),
        }}
      />
      {suggestions.length > 0 && query.length > 0 && (
        <Fade in={true}>
          <div
            ref={suggestionsRef}
            style={{
              position: 'absolute',
              top: '100%',
              zIndex: 5,
              left: 0,
              right: 0,
              maxHeight: '200px', // Set the desired height for the scrollable list
              overflowY: 'auto', // Enable vertical scrolling
              backgroundColor: '#fff',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: 4,
              marginTop: 4,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <ListItemText primary={suggestion} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </Fade>
      )}
    </div>
  )
}

export default SearchBar

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pokemonColors from '../utils/pokemonColors'
import { Box, Typography, Chip, Card, CardContent, Pagination, Grid, CircularProgress } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import StatBar from '../components/StatBar'
import legendaryIcon from '../assets/legendaryIcon.png'
import mythicalIcon from '../assets/mythicalIcon.png'
import { ErrorContext } from '../contexts/ErrorContext'
import { DataContext } from '../contexts/DataContext'
import PaginationComponent from '../components/PaginationComponent'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
  },
})

const DetailsPage = () => {
  const { identifier } = useParams()

  const [pokemon, setPokemon] = useState(null)

  const { showError } = useContext(ErrorContext)
  const { pokemonList, updatePokemonList } = useContext(DataContext)
  
  const updateSpecies = async () => {
    console.log('calling hadle updateSpecies', parseInt(identifier, 10))
    let obj = pokemonList.find(item => (item.id === parseInt(identifier, 10)))
    console.log('pokemon in species', obj)
    const url = obj.species.url
    if(url){
      let newObj = JSON.parse(JSON.stringify(obj))
      let response = await fetch(url)
      let species = await response.json()
      if (response.status !== 200){
        showError('Something went wrong fetching the species')
        console.log('Error: ', response.statusText)
      } else {
        newObj.species = species
        setPokemon(newObj)
        let temp = pokemonList
        let ind = temp.indexOf(obj)
        temp.splice(ind, 1, newObj)
        updatePokemonList(temp)
      }
    } else {
      setPokemon(obj)
    }
  }
  
  const updatePoke = async () => {
    let obj = pokemonList.find(item => item.id === parseInt(identifier, 10))
    console.log('object', obj)
    if(obj){
      if(obj.url){
        let response = await fetch(obj.url)
        let data = await response.json()
        if (response.status !== 200){
          showError('Something went wrong')
          console.log('Error: ', response.statusText)
        } else {
          let temp = pokemonList
          let ind = temp.indexOf(obj)
          temp.splice(ind, 1, data)
          updatePokemonList(temp)
          // setPokemon(data)
        }
      }
    } else {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + identifier + '/')
      let data = await response.json()
      if (response.status !== 200){
        showError('Pokemon Not Found')
        console.log('Error: ', response.statusText)
      } else {
        let temp = pokemonList
        temp.push(data)
        updatePokemonList(temp)
        // setPokemon(data)
        console.log('pokemonlist', pokemonList)
      }
    }
    updateSpecies()
  }

  useEffect(() => {
    updatePoke()
    console.log('in useEffect')
  }, [identifier])  
  
  const getStatColor = (value) => {
    if (value < 60) {
      return 'red'
    } else if (value < 120) {
      return 'orange'
    } else {
      return 'green'
    }
  }
  
  if(!pokemon){
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
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ bgcolor: pokemonColors(), mb: 2 }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: pokemonColors(pokemon.species.color.name), position: 'relative' }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: "#fff" }}>
                          {pokemon.isBookmarked ? (
                            <BookmarkIcon onClick={toggleBookmark} />
                          ) : (
                            <BookmarkBorderIcon onClick={toggleBookmark} />
                          )}
                          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
                          #{pokemon.id.toString().padStart(4, '0')}
                        </Typography>
                        <img
                          src={pokemon.sprites.other.dream_world.front_default}
                          alt={pokemon.name}
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Base Experience: {pokemon.base_experience}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Height: {pokemon.height} decimeters
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Weight: {pokemon.weight} hectograms
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Abilities: {pokemon.abilities.map((item) => item.ability.name).join(', ')}
                        </Typography>
                        {pokemon.species.is_legendary && (
                          <img src={legendaryIcon} alt="Legendary" style={{ position: 'absolute', top: 10, right: 10, width: '50px', height: '50px'}} />
                        )}
                        {pokemon.species.is_mythical && (
                          <img src={mythicalIcon} alt="Mythical" style={{ position: 'absolute', top: 10, right: 70, width: '50px', height: '50px' }} />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: pokemonColors(pokemon.species.color.name) }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                          Stats
                        </Typography>
                        {pokemon.stats.map((item) => (
                          <StatBar
                            key={item.stat.name}
                            label={item.stat.name}
                            value={item.base_stat}
                            maxValue={100} // Set the maximum value for the health bar
                            color={getStatColor(item.base_stat)} // Custom function to determine the color based on the stat value
                          />
                        ))}
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff', mt: "8px" }}>
                          Types:
                          {pokemon.types.map((item) => (
                            <Chip
                              key={item.type.name}
                              label={item.type.name}
                              variant="filled"
                              sx={{ marginLeft: '0.5rem', color: '#fff', borderColor: '#fff' }}
                            />
                          ))}
                        </Typography>
                        {/* Additional Info */}
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Egg Groups: {pokemon.species.egg_groups.map((item) => item.name).join(", ")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Growth Rate: {pokemon.species.growth_rate.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Habitat: {pokemon.species.habitat.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Base Happiness: {pokemon.species.base_happiness}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                          Capture Rate: {pokemon.species.capture_rate}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ bgcolor: pokemonColors() }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Moves
                </Typography>
                <PaginationComponent moves={pokemon.moves} movesPerPage={12} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default DetailsPage

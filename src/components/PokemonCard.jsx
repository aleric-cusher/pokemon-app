import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const PokemonCard = ({ name_id }) => {
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    let updatePoke = async () => {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name_id + '/')
      let data = await response.json()
      if (response.status === 200){
        const pokemon = pokemonShuffler(data.results)
        setPokemon(pokemon)
      } else {
        showError('Something went wrong with fetching individual data!')
        console.log(response.statusText)
      }
    }
    updatePoke()
  }, [])

  const { name, id, base_experience, height, weight, abilities, types } = pokemon
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Base Experience: {base_experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {height}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: {weight}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Abilities: {abilities.map((item) => item.ability.name).join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Types: {types.map((item) => item.type.name).join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    )
  }
  
  export default PokemonCard
  
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { ErrorContext } from '../contexts/ErrorContext'
import { DataContext } from '../contexts/DataContext'
import pokemonColors from '../utils/pokemonColors'
import { BookmarkContext } from '../contexts/BookmarkContext'

const PokemonCard = ({ pokemonIdentifier }) => {
  const { bookmarked, updateBookmarked } = useContext(BookmarkContext)
  const { showError } = useContext(ErrorContext)
  const { pokemonList, updatePokemonList } = useContext(DataContext)

  const [pokemon, setPokemon] = useState([])
  const [isBookmark, setIsBookmark] = useState(false)

  const navigate = useNavigate()

  const updateSpecies = async () => {
    let obj = pokemonList.find(item => (item.name === pokemonIdentifier || item.id === pokemonIdentifier))
    const url = obj.species.url
    if(url){
      let newObj = JSON.parse(JSON.stringify(obj))
      let response = await fetch(url)
      if (response.status !== 200){
        showError('Something went wrong fetching the species')
        console.log('Error: ', response.statusText)
      } else {
        let species = await response.json()
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
    let obj = pokemonList.find(item => (item.name === pokemonIdentifier || item.id === pokemonIdentifier))
    if(obj){
      if(obj.url){
        let response = await fetch(obj.url)
        if (response.status !== 200){
          showError('Something went wrong')
          console.log('Error: ', response.statusText)
        } else {
          let data = await response.json()
          let temp = pokemonList
          setPokemon(data)
          let ind = temp.indexOf(obj)
          temp.splice(ind, 1, data)
          updatePokemonList(temp)
          updateSpecies()
        }
      } else {
        setPokemon(obj)
      }
    } else {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonIdentifier.toString() + '/')
      if (response.status !== 200){
        showError('Pokemon Not Found')
        console.log('Error: ', response.statusText)
      } else {
        let data = await response.json()
        setPokemon(data)
        let temp = pokemonList
        temp.push(data)
        updatePokemonList(temp)
        updateSpecies()
      }
    }
  }

  const updateBookmark = () => {
    setIsBookmark(bookmarked.includes(pokemon.id) ? true : false)
  }

  useEffect(() => {
    updatePoke()
  }, [pokemonIdentifier])

  useEffect(() => {
    updateBookmark()
  }, [pokemon])
  
  const handleClick = (e) => {
    e.preventDefault()
    if (e.target === document.getElementById('bookmark-icon')) {
      toggleBookmark(e)
    } else {
      navigate(`/details/${pokemonIdentifier}`, { state: pokemon })
    }
  }

  const toggleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmark((prevState) => !prevState)
  
    let arr = bookmarked.includes(pokemon.id)
      ? bookmarked.filter((id) => id !== pokemon.id)
      : [...bookmarked, pokemon.id]
  
    updateBookmarked(arr)
  }

  if(!pokemon.species){
    return null
  }


  const { name, id, base_experience, height, weight, abilities, types, sprites } = pokemon
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card onClick={handleClick} style={{ overflow: 'hidden', borderRadius: '12px', cursor: 'pointer' }}>
        <div
          style={{
            backgroundColor: pokemonColors((pokemon.species.color ? pokemon.species.color.name : null)),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={sprites.other.dream_world.front_default || sprites.other.home.front_default || sprites.other['official-artwork'].front_default}
            alt={name}
            style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <Typography variant="body2" color="#fff" style={{ position: 'absolute', top: '10px', right: '10px', fontWeight: 'bold' }}>
            #{id.toString().padStart(4, '0')}
          </Typography>
          {isBookmark ? (
            <BookmarkIcon
              id="bookmark-icon"
              style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff', cursor: 'pointer' }}
              onClick={toggleBookmark}
            />
          ) : (
            <BookmarkBorderIcon
              id="bookmark-icon"
              style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff', cursor: 'pointer' }}
              onClick={toggleBookmark}
            />
          )}
        </div>
        <CardContent>
          <Typography variant="h5" component="div" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {name}
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
  
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Button, Grid, Card, CardMedia } from '@mui/material'

const HomePage = () => {
  const bannerImages = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/35.svg',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/76.svg',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [bannerImages.length])

  return (
    <Container maxWidth="md" sx={{ textAlign: 'left', marginTop: '3rem' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "600px", alignItems: "center", backgroundColor:"#81b29a", display: "flex", justifyContent: "center" }}>
            <CardMedia component="img" image={bannerImages[currentImageIndex]} alt="Banner" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Arial', color: '#333' }}>
            Welcome to Pokédex Web App!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '2rem', color: '#666' }}>
            Explore the world of Pokémon and catch 'em all!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color: '#666' }}>
            The Pokédex app provides a comprehensive collection of information about all your favorite Pokémon characters. Explore the vast world of Pokémon and discover details such as abilities, characteristics, types, and more.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color: '#666' }}>
            To get started, click on the "Search Pokémon" button to search for a specific Pokémon by name. You can then view
            detailed information about the Pokémon on its individual page.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color: '#666' }}>
            Additionally, you can bookmark your favorite Pokémon by clicking on the bookmark icon and easily access them later by clicking on the "View Bookmarks" button.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color: '#666' }}>
            Get ready to embark on an exciting journey into the Pokémon universe with the Pokédex Web App. Gotta catch 'em all!
          </Typography>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            size="large"
            color="primary"
            sx={{ marginRight: '1rem', backgroundColor: '#FF9800', color: '#fff' }}
          >
            Search Pokémon
          </Button>
          <Button
            component={Link}
            to="/bookmarks"
            variant="contained"
            size="large"
            color="primary"
            sx={{ backgroundColor: '#FF9800', color: '#fff' }}
          >
            View Bookmarks
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage

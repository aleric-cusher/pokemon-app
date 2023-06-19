import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '3rem' }}>
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
    </Container>
  );
}

export default HomePage;

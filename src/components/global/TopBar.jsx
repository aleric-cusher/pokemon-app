import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const TopBar = () => {
  const location = useLocation()

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', borderRadius: 1}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Pokédex
        </Typography>
        <nav>
          <Button
            component={Link}
            to="/"
            color={location.pathname === '/' ? 'secondary' : 'inherit'}
            sx={{ marginRight: '1rem' }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/search"
            color={location.pathname === '/search' ? 'secondary' : 'inherit'}
            sx={{ marginRight: '1rem' }}
          >
            Search
          </Button>
          <Button
            component={Link}
            to="/bookmarks"
            color={location.pathname === '/bookmarks' ? 'secondary' : 'inherit'}
          >
            Bookmarks
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar

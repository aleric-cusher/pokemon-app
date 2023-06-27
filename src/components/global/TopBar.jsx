import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

const TopBar = () => {
  const location = useLocation()

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4e4e4e', borderRadius: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton component={Link} to="/" sx={{ marginRight: "1rem" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Pokédex
        </Typography>
        </IconButton>
        <nav>
          <IconButton
            component={Link}
            to="/"
            color={location.pathname === '/' ? '#ffb4a2' : 'inherit'}
            sx={{ marginRight: '1rem' }}
          >
            <HomeIcon />
            <Typography variant="subtitle1" component="span" sx={{ marginLeft: '0.5rem' }}>
              Home
            </Typography>
          </IconButton>
          <IconButton
            component={Link}
            to="/search"
            color={location.pathname === '/search' ? '#ffb4a2' : 'inherit'}
            sx={{ marginRight: '1rem' }}
          >
            <SearchIcon />
            <Typography variant="subtitle1" component="span" sx={{ marginLeft: '0.5rem' }}>
              Search
            </Typography>
          </IconButton>
          <IconButton
            component={Link}
            to="/bookmarks"
            color={location.pathname === '/bookmarks' ? '#ffb4a2' : 'inherit'}
          >
            <BookmarksIcon />
            <Typography variant="subtitle1" component="span" sx={{ marginLeft: '0.5rem' }}>
              Bookmarks
            </Typography>
          </IconButton>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar

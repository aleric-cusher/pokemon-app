import React, { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import { Grid, Button, CircularProgress } from '@mui/material'

const ListingComponent = ({ identifiers, loadMore=false, initialLoad=10, updateInitialLoad=null }) => {
  const [visibleIdentifiers, setVisibleIdentifiers] = useState([])
  const [allIdentifiers, setAllIdentifiers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      const totalLoaded = visibleIdentifiers.length + 10
      if (totalLoaded >= allIdentifiers.length) {
        setIsAllLoaded(true)
      }
      setVisibleIdentifiers(allIdentifiers.slice(0, totalLoaded))
      setIsLoading(false)
      if(typeof updateInitialLoad === "function"){
        updateInitialLoad(totalLoaded)
      }
    }, 500)
  }

  useEffect(() => {
    setAllIdentifiers([...new Set(identifiers)])
  }, [identifiers])

  useEffect(() => {
    setVisibleIdentifiers(allIdentifiers.slice(0, initialLoad))
  }, [allIdentifiers])

  useEffect(() => {
    setVisibleIdentifiers((prevVisibleIdentifiers) => {
      const updatedVisibleIdentifiers = prevVisibleIdentifiers.filter((item) =>
      allIdentifiers.includes(item)
      )
      return updatedVisibleIdentifiers
    })
  }, [allIdentifiers])

  if(!loadMore){
    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="left" spacing={2}>
            {allIdentifiers.map((item) => (
              <PokemonCard key={item} pokemonIdentifier={item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="left" spacing={2}>
          {visibleIdentifiers.map((item) => (
            <PokemonCard key={item} pokemonIdentifier={item} />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {!isAllLoaded && visibleIdentifiers.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              fullWidth
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                'Load More'
              )}
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListingComponent

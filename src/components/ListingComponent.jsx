import React, { useState } from 'react'
import PokemonCard from './PokemonCard'
import { Grid, Button, CircularProgress } from '@mui/material'

const ListingComponent = ({ identifiers }) => {
  const [visibleIdentifiers, setVisibleIdentifiers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulating an asynchronous data fetching operation
    setTimeout(() => {
      const totalLoaded = visibleIdentifiers.length + 10
      if (totalLoaded >= identifiers.length) {
        setIsAllLoaded(true)
      }
      setVisibleIdentifiers(identifiers.slice(0, totalLoaded))
      setIsLoading(false)
    }, 1000)
  }

  // Load initial set of identifiers
  useState(() => {
    setVisibleIdentifiers(identifiers.slice(0, 10))
  }, [])

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
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading || isAllLoaded}
            onClick={handleLoadMore}
            fullWidth
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              'Load More'
            )}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListingComponent




// import React from 'react'
// import PokemonCard from './PokemonCard'
// import { Grid } from '@mui/material'

// const ListingComponent = ({ identifiers }) => {
//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <Grid container justifyContent="left" spacing={2}>
//           {identifiers.map((item) => {
//             return <PokemonCard key={item} pokemonIdentifier={item} />
//           })}
//         </Grid>
//       </Grid>
//     </Grid>
//   )
// }

// export default ListingComponent

import { Box, Grid, Chip, Pagination } from '@mui/material'
import { useState } from 'react'

const PaginationComponent = ({ moves, movesPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (_, value) => {
    setCurrentPage(value)
  }

  const indexOfLastMove = currentPage * movesPerPage
  const indexOfFirstMove = indexOfLastMove - movesPerPage
  const currentMoves = moves.slice(indexOfFirstMove, indexOfLastMove)

  return (
    <>
      <Grid container spacing={1} style={{ maxHeight: 300, overflow: 'auto' }}>
        {currentMoves.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.move.name}>
            <Chip label={item.move.name} variant="outlined" />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Pagination
          count={Math.ceil(moves.length / movesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="small"
        />
      </Box>
    </>
  )
}

export default PaginationComponent
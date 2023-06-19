import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import { BookmarkContext } from '../contexts/BookmarkContext'
import ListingComponent from '../components/ListingComponent'

const BookmarksPage = () => {
    const { bookmarked } = useContext(BookmarkContext)
  return (
    <Box mt="20px">
      <ListingComponent identifiers={bookmarked} />
    </Box>
  )
}

export default BookmarksPage
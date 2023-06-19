import React, { useContext } from 'react'
import { BookmarkContext } from '../contexts/BookmarkContext'
import ListingComponent from '../components/ListingComponent'

const BookmarksPage = () => {
    const { bookmarked } = useContext(BookmarkContext)
  return (
    <ListingComponent identifiers={bookmarked} />
  )
}

export default BookmarksPage
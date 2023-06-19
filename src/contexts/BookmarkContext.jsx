import React, { createContext, useEffect, useState } from 'react'

const BookmarkContext = createContext()

const BookmarkProvider = ({ children }) => {
  const [bookmarked, setBookmarked] = useState(localStorage.getItem('bookmarked') ? JSON.parse(localStorage.getItem('bookmarked')) : [])

  const updateBookmarked = (arr) => {
    setBookmarked([...new Set(arr)])
    localStorage.setItem('bookmarked', JSON.stringify([...new Set(arr)]))
  }

  let contextData = {
    bookmarked: bookmarked,
    updateBookmarked: updateBookmarked
  }

  return (
    <BookmarkContext.Provider value={contextData}>
      {children}
    </BookmarkContext.Provider>
  )
}

export { BookmarkContext, BookmarkProvider }

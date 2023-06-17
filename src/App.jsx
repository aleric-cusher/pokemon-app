import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/global/TopBar'
import SearchPage from './pages/SearchPage'
import SearchComponent from './components/SearchBar'
import { DataProvider } from './context/DataContext'
import { ErrorProvider } from './context/ErrorContext'
import ErrorPopup from './components/global/ErrorPopup'

function App() {

  return (
    <ErrorProvider>
      <DataProvider>
        <div className='app'>
          <ErrorPopup />
          <Router>
            <TopBar />
            <Routes>
              {/* <Route exact path="/" element={<HomePage/>} /> */}
              <Route path="/search" element={ <SearchPage /> } />
              {/* <Route path="/listing" element={<ListingPage/>} /> */}
              {/* <Route path="/details/:pokemonId" element={<DetailsPage/>} /> */}
              {/* <Route path="/bookmarks" element={<BookmarksPage/>} /> */}
            </Routes>
          </Router>
        </div>
      </DataProvider>
    </ErrorProvider>
  )
}

export default App

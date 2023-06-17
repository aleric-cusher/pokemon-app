import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/global/TopBar'

function App() {

  return (
    <div className='app'>
      <Router>
        <TopBar />
        {/* <Routes>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route exact path="/listing" component={ListingPage} />
          <Route path="/details/:pokemonId" component={DetailsPage} />
          <Route path="/bookmarks" component={BookmarksPage} />
        </Routes> */}
      </Router>
    </div>
  )
}

export default App

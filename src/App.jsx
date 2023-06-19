import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/global/TopBar'
import SearchPage from './pages/SearchPage'
import { DataProvider } from './contexts/DataContext'
import { ErrorProvider } from './contexts/ErrorContext'
import { BookmarkProvider } from './contexts/BookmarkContext'
import ErrorPopup from './components/global/ErrorPopup'
import DetailsPage from './pages/DetailsPage'
import BookmarksPage from './pages/BookmarksPage'
import HomePage from './pages/HomePage'


function App() {

  return (
    <ErrorProvider>
      <BookmarkProvider>
        <DataProvider>
          <div className='app'>
            <ErrorPopup />
            <Router>
              <TopBar />
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/search" element={ <SearchPage /> } />
                <Route path="/details/:identifier" element={<DetailsPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
              </Routes>
            </Router>
          </div>
        </DataProvider>
      </BookmarkProvider>
    </ErrorProvider>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/global/TopBar'
import SearchPage from './pages/SearchPage'
import { DataProvider } from './contexts/DataContext'
import { ErrorProvider } from './contexts/ErrorContext'
import ErrorPopup from './components/global/ErrorPopup'
import DetailsPage from './pages/DetailsPage'

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
              <Route path="/detail/:identifier" element={<DetailsPage />} />
              {/* <Route path="/bookmarks" element={<BookmarksPage/>} /> */}
            </Routes>
          </Router>
        </div>
      </DataProvider>
    </ErrorProvider>
  )
}

export default App

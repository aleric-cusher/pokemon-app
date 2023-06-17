import React, { createContext, useState } from 'react'

const ErrorContext = createContext()

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null)

  const showError = (errorMessage) => {
    setError(errorMessage)
  }

  const hideError = () => {
    setError(null)
  }

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export { ErrorContext, ErrorProvider }

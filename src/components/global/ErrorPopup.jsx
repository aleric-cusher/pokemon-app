import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ErrorContext } from '../../contexts/ErrorContext'

const ErrorPopup = () => {
  const { error, hideError } = useContext(ErrorContext)

  const handleClose = () => {
    hideError()
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}

export default ErrorPopup

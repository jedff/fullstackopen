import { useSelector } from 'react-redux'
import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification !== null) {
    return (
      <Alert variant={notification.status}>
      {notification.msg}
      </Alert>
    )
  }
  return null
}

export default Notification

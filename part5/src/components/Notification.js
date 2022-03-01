import React from 'react'

const Notification = ({ classname, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classname}>
      {message}
    </div>

  )
}

export default Notification
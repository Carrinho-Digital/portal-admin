import React from 'react'

export default function Loading(props) {
  return (
    <div className="p-3 w-100 d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

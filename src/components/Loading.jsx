import React from 'react'

export default function Loading(props) {
  return (
    <div class="p-3 w-100 d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}

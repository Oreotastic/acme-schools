import React from 'react'

const Schools = ({schools}) => {
  return(
    <div>
      <h1>Schools</h1>
      <ul>
        {
          schools.map(school => {
            return(
              <li key={school.id}>
                <p>{school.name}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Schools
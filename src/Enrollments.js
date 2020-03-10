import React from 'react'

const Enrollments = ({students, schools, enrollments}) => {
  return(
    <div>
      <h1>Enrollments</h1>
      <ul>
        {
          enrollments.map(enrollment => {
            return(
              <li key={enrollment.id}>
                
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Enrollments
import React from 'react'

const Students = ({students}) => {

  return(
    <div>
      <h1>Students</h1>
      <ul>
        {
          students.map(student => {
            return(
              <li key={student.id}>
                <p>{student.name}</p>
              </li>
            )
          }) 
        }
      </ul>
    </div>
  )
}

export default Students
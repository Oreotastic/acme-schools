import React from 'react'

const Students = ({students, setView}) => {

  return(
    <div className="box unenrolled">
      <h4>Unenrolled Students</h4>
      <ul>
        {
          students.map(student => {
            if(student.school_id === null) {
              return(
                <li key={student.student_id}>
                  <a href={'#view=student' + student.student_id} onClick={(el) => setView(student.student_id)}><p>{student.name}</p></a>
                </li>
              )
            }
          }) 
        }
      </ul>
    </div>
  )
}

export default Students
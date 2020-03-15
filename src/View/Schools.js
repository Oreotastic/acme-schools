import React from 'react'
import Enrollment from '../Enrollment/Enrollment'
import Unenroll from '../Enrollment/Unenroll'

const Schools = ({schools, students, enrollStudent, unenroll, setView}) => {
  
  return(
    <div>
      <ul  className="school-list">
        {
          schools.map(school => {
            return(
              <li className="box school" id={school.id} key={school.id}>
                <a href={'#view=school' + school.id} onClick={(el) => setView(school.id)}><h4>{school.name}</h4></a>
                <Enrollment school={school} students={students} enrollStudent={enrollStudent}/>
                <ul className="student-list">
                  {
                    students.map(student => {
                      if(student.school_id === school.id) {
                        return(
                          <li key={student.student_id}>
                            <div className="enrolled-student">
                              <a href={'#view=student' + student.student_id} onClick={(el) => setView(student.student_id)}><h5 className="student-name">{student.name}</h5></a>
                              <Unenroll students={students} student={student} unenroll={unenroll}/>
                            </div>
                          </li>
                        )
                      }
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Schools
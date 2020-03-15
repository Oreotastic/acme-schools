import React from 'react'
const {useState} = React

const StudentView = ({schools, students, view, enrollStudent, removeStudent}) => {

  const selectedStudent = students.find(student => student.student_id === view)
  const currentSchool = schools.find(school => school.id === selectedStudent.school_id)
  const [name, setName] = useState(selectedStudent.name)
  const [selectedId, setSelectedId] = useState('')

  const onSubmit = (el) => {
    el.preventDefault()
    if(selectedId !== '') {
      enrollStudent(selectedStudent.student_id, name, selectedId)
    }
  }

  return (
    <div className="container">
      <h1>{selectedStudent.name}</h1>
      <form onSubmit={onSubmit} className="create-student">
        <input type="text" value={name} onChange={(el) => setName(el.target.value)}/>
        <select onChange={(el) => {
          const options = el.target.options
          const id = options[options.selectedIndex].dataset.id;
          setSelectedId(id)
        }}>
          <option data-id={currentSchool !== undefined ? currentSchool.id : null}>{currentSchool !== undefined ? currentSchool.name : null}</option>
          {
            schools.map(school => {
              if((currentSchool === undefined) ||(currentSchool !== undefined && school.id !== currentSchool.id)) {
                return (
                  <option data-id={school.id}>{school.name}</option>
                )
              }
            })
          }
        </select>
        <button>Update</button>
      </form>

      <a href=''>
        <button className="remove" onClick={() => removeStudent(selectedStudent.student_id)}>Delete Student</button>
      </a>
    </div>
  )
}

export default StudentView
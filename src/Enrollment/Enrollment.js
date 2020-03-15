import React from 'react'
const {useState} = React

const Enrollment = ({school, students, enrollStudent}) => {
  const [selectedId, setSelectedId] = useState('')
  const [name, setName] = useState('')


  const onSubmit = (el) => {
    el.preventDefault()
    if(selectedId !== '') {
      enrollStudent(selectedId, name, school.id)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <select className="select-student" onChange={(el) => {
          const options = el.target.options
          const id = options[options.selectedIndex].dataset.id;
          setName(options[options.selectedIndex].value)
          setSelectedId(id)
        }}>
          <option value="...">...</option>
          {
            students.map(student => {
              if(student.school_id === null) {
                return(
                  <option data-id={student.student_id} key={student.student_id} value={student.name}>{student.name}</option>
                )
              }
            })
          }
        </select>
        <button>Enroll</button>
      </form>
    </div>
  )
}

export default Enrollment
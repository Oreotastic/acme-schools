import React from 'react'
const {useState} = React

const CreateStudent = ({schools, createStudent}) => {
  const [name, setName] = useState('')
  const [schoolChoice, setSchoolChoice] = useState('...')
  const onSubmit = (el) => {
    el.preventDefault()
    if(schoolChoice !== '...') {
      const schoolId = schools.find(school => school.name === schoolChoice)
      console.log(schoolChoice)
      createStudent(name, schoolId.id)
    } else {
      createStudent(name)
    }
  }
  
  return(
    <div className="box">
      <h2>Create Student</h2>
      <form onSubmit={onSubmit} className="create-student">
        <input type="text" value={name} onChange={(el)=>setName(el.target.value)}/>
        <select id="schools" onChange={el => setSchoolChoice(el.target.value)}>
          <option value="..." defaultValue>...</option>
          {
            schools.map(school => {
              return(
                <option key={school.id} value={school.name}>{school.name}</option>
              )
            })
          }
        </select>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateStudent
import React from 'react' 

const {useState} = React

const SchoolView = ({schools, setView, view, updateSchool, removeSchool}) => {
  
  const selectedSchool = schools.find(school => school.id === view)
  const [name, setName] = useState(selectedSchool.name)

  const onSubmit = (el) => {
    el.preventDefault()
    updateSchool(selectedSchool.id, name)
  }

  return (
    <div className="container school-view">
      <div className="school-form">
        <h1>{selectedSchool.name}</h1>
        <form onSubmit={onSubmit} className="create-school">
          <input type="text" value={name} onChange={(el) => setName(el.target.value)}/>
          <button>Update</button>
        </form>
      </div>

      <a href={``}><button className="remove" onClick={()=> {
        removeSchool(selectedSchool.id)
      }}>Delete School</button></a>
    </div>
  )
}

export default SchoolView
import React from 'react'
const {useState} = React

const CreateSchool = ({schools, createSchool}) => {
  const [name, setName] = useState('')

  const onSubmit = (el) => {
    el.preventDefault()
    createSchool(name)
  }

  return(
    <div className="box">
      <h2>Create School</h2>
      <form onSubmit={onSubmit} className="create-school">
        <input type="text" value={name} onChange={(el) => setName(el.target.value)}/>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateSchool
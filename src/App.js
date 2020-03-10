import React from 'react'
import axios from 'axios'
import Students from './Students'
import Schools from './Schools'

const {useState, useEffect} = React

const App = () => {
  const [students, setStudents] = useState([])
  const [schools, setSchools] = useState([])
  const [enrollments, setEnrollments] = useState([]) 

  useEffect(()=>{
    Promise.all([
      axios.get('/api/students'),
      axios.get('/api/schools'),
      axios.get('/api/enrollments')
    ]).then(results => {
      setStudents(results[0].data)
      setSchools(results[1].data)
      setEnrollments(results[2].data)
    })
  }, [])

  return(
    <div>
      <Students students={students}/>
      <Schools schools={schools}/>
    </div>
  )
}

export default App
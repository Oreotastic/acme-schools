import React from 'react'
import axios from 'axios'
import Home from './Home'
import qs from 'qs'
import SchoolView from './Page/SchoolView'
import StudentView from './Page/StudentView'

const {useState, useEffect} = React

const App = () => {
  const [view, setView] = useState('') 
  const [students, setStudents] = useState([])
  const [schools, setSchools] = useState([])

  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));

  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const createStudent = async(name, schoolChoice) => {
    if(schoolChoice !== '...') {
      const createdStudent = (await axios.post('/api/students', {name, schoolId: schoolChoice})).data
      console.log(createdStudent)
      setStudents([...students, createdStudent])
    }
  }

  const createSchool = async(name) => {
    const created = (await axios.post('/api/schools', {name})).data
    setSchools([...schools, created])
  }

  const enrollStudent = async(studentId, name, schoolId) => {
    setStudents(students.map(student => {
      if(student.student_id === studentId) {
        student.name = name
        student.school_id = schoolId
        return student
      } else {
        return student
      }
    }))
    await axios.put(`/api/students/${studentId}`, {name: name, school_id: schoolId})
  }

  const updateSchool = async(schoolId, name) => {
    setSchools(schools.map(school => {
      if(school.id === schoolId) {
        school.name = name
        return school
      } else {
        return school
      }
    }))

    await axios.put(`/api/schools/${schoolId}`, {name: name})
  }

  const unenroll = async(studentId) => {
    setStudents(students.map(student => {
      if(student.student_id === studentId) {
        student.school_id = null
        return student
      } else {
        return student
      }
    }))

    await axios.put(`/api/students/${studentId}`, {school_id: null})
  }

  const removeSchool = async(schoolId) => {
    setSchools(schools.filter(school => school.id !== schoolId))
    await axios.delete(`/api/schools/${schoolId}`)
  }

  const removeStudent = async(studentId) => {
    setStudents(students.filter(student => student.student_id !== studentId))
    await axios.delete(`/api/students/${studentId}`)
  }

  useEffect(()=>{
    Promise.all([
      axios.get('/api/students'),
      axios.get('/api/schools'),
    ]).then(results => {
      setStudents(results[0].data)
      setSchools(results[1].data)
    })
  }, [])

  if(params.view === undefined) {
    return (
      <div>
        <a href=''><h1>Acme Schools</h1></a>
        <ul>
          <li>{schools.length + ' schools'}</li>
          <li>{students.length + ' students'}</li>
        </ul>
        <Home 
          schools={schools} 
          students={students} 
          createStudent={createStudent} 
          createSchool={createSchool} 
          enrollStudent={enrollStudent}
          unenroll={unenroll}
          setView={setView}
        />
      </div>
    )
  } else if (params.view === `school${view}`){
    console.log('test')
    return (
      <div>
        <a href=''><h1>Acme Schools</h1></a>
        <ul>
          <li>{schools.length + ' schools'}</li>
          <li>{students.length + ' students'}</li>
        </ul>
        <SchoolView schools={schools} students={students} view={view} updateSchool={updateSchool} removeSchool={removeSchool}/>
      </div>
    )
  } else if (params.view === `student${view}`) {
    return (
      <div>
        <a href=''><h1>Acme Schools</h1></a>
        <ul>
          <li>{schools.length + ' schools'}</li>
          <li>{students.length + ' students'}</li>
        </ul>
        <StudentView schools={schools} students={students} view={view} enrollStudent={enrollStudent} removeStudent={removeStudent}/>
      </div>
    )
  }
}

export default App
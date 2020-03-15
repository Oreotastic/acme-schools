import React from 'react'
import CreateSchool from './Create/CreateSchool'
import CreateStudent from './Create/CreateStudent'
import Students from './View/Students'
import Schools from './View/Schools'


const Home = ({schools, students, createSchool, createStudent, enrollStudent, unenroll, setView}) => {
  return(
    <div className="main">
      <div className="create">
        <CreateStudent schools={schools} students={students} createStudent={createStudent} view={setView}/>
        <CreateSchool schools={schools} createSchool={createSchool} view={setView}/>
      </div>
      <div className="schools-students">
        <Students students={students} setView={setView}/>
        <Schools schools={schools} students={students} enrollStudent={enrollStudent} unenroll={unenroll} setView={setView}/>
      </div>
    </div>
  )
}

export default Home
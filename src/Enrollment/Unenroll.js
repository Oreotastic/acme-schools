import React from 'react'

const Unenroll = ({students, student, unenroll}) => {

  return (
    <button onClick={()=>unenroll(student.student_id)}>Unenroll</button>
  )
}

export default Unenroll
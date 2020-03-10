const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/api/students', (req, res, next) => {
  db.getStudents()
  .then(response => res.send(response))
  .catch(next)
})

app.get('/api/schools', (req, res, next) => {
  db.getSchools()
  .then(response => res.send(response))
  .catch(next)
})

app.get('/api/enrollments', (req, res, next) => {
  db.getEnrollments()
  .then(response => res.send(response))
  .catch(next)
})

app.post('/api/students', (req, res, next) => {
  db.createStudent(req.body.name)
  .then(response => res.send(response))
  .catch(next)
})

const port = 3000

db.sync().then(() => {
  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })
})
const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use("/assets", express.static(path.join(__dirname, "assets")))

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

app.post('/api/students', (req, res, next) => {
  db.createStudent(req.body.name, req.body.schoolId)
  .then(response => res.send(response))
  .catch(next)
})

app.post('/api/schools', (req, res, next) => {
  db.createSchools(req.body.name)
  .then(response => res.send(response))
  .catch(next)
})

app.put('/api/students/:id', (req, res, next) => {
  db.updateStudents(req.body.school_id, req.body.name, req.params.id)
  .then(response => res.send(response))
  .catch(next)
})

app.put('/api/schools/:id', (req, res, next) => {
  db.updateSchools(req.body.name, req.params.id)
  .then(response => res.send(response)) 
  .catch(next)
})

app.delete('/api/schools/:id', (req, res, next) => {
  db.deleteSchools(req.params.id) 
  .then(resposne => res.send(resposne))
  .catch(next)
})

app.delete('/api/students/:id', (req, res, next) => {
  db.deleteStudents(req.params.id) 
  .then(response => res.send(response))
  .catch(next)
})

const port = 3000

db.sync().then(() => {
  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })
})
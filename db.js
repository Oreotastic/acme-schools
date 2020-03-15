const pg = require('pg')
const {Client} = pg
const client = new Client('https://localhost/acme-schools')

client.connect()

const sync = async() => {
  const sql = `
    DROP TABLE IF EXISTS schools cascade;
    DROP TABLE IF EXISTS students cascade;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE schools(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR NOT NULL
    );

    CREATE TABLE students(
      student_id UUID UNIQUE DEFAULT uuid_generate_v4(),
      school_id UUID references schools(id),
      name VARCHAR NOT NULL,
      PRIMARY KEY (student_id)
    );

    INSERT INTO schools(name) VALUES('UNF');
    INSERT INTO students(name) VALUES('Hunter Oreair');
  `

  await client.query(sql)
}

const getStudents = async() => {
  const sql = `SELECT * FROM students`
  const response = await client.query(sql)
  return response.rows
}

const createStudent = async(name, school_id) => {
  const sql = `INSERT INTO students(name, school_id) VALUES($1, $2) returning *`
  const response = await client.query(sql, [name, school_id])
  return response.rows[0]
}

const getSchools = async() => {
  const sql = `SELECT * FROM schools`
  const response = await client.query(sql)
  return response.rows
}

const createSchools = async(name) => {
  const sql = `INSERT INTO schools(name) VALUES($1) returning *`
  const response = await client.query(sql, [name])
  return response.rows[0]
}

const updateStudents = async(schoolId, name, id) => {
  const sql = `UPDATE students SET school_id = $1, name = $2 WHERE student_id = $3`
  const response = await client.query(sql, [schoolId, name, id])
  return response.rows[0]
}

const updateSchools = async(name, id) => {
  const sql = `UPDATE schools SET name = $1 WHERE id = $2`
  const response = await client.query(sql, [name, id])
  return response.rows[0]
}

const deleteSchools = async(id) => {
  const sql = `DELETE from schools WHERE id = $1`
  await client.query(sql, [id])
}

const deleteStudents = async(id) => {
  const sql = `DELETE from students WHERE student_id = $1`
  await client.query(sql, [id])
}


module.exports = {
  sync,
  getStudents,
  getSchools,
  createStudent,
  createSchools, 
  updateStudents,
  updateSchools,
  deleteSchools,
  deleteStudents
}


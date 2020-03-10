const pg = require('pg')
const {Client} = pg
const client = new Client('https://localhost/acme-schools')

client.connect()

const sync = async() => {
  const sql = `
    DROP TABLE IF EXISTS schools cascade;
    DROP TABLE IF EXISTS students cascade;
    DROP TABLE IF EXISTS enrollments;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE schools(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR NOT NULL
    );

    CREATE TABLE students(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR NOT NULL,
      enrolled BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE enrollments(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      school_id UUID REFERENCES schools(id),
      student_id UUID REFERENCES students(id)
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

const createStudent = async(name) => {
  const sql = `INSERT INTO students(name), VALUES($1) returning *`
  const response = await client.query(sql, [name])
  return response.rows[0]
}

const getSchools = async() => {
  const sql = `SELECT * FROM schools`
  const response = await client.query(sql)
  return response.rows
}

const getEnrollments = async() => {
  const sql = `SELECT * FROM enrollments`
  const response = await client.query(sql)
  return response.rows
}

module.exports = {
  sync,
  getStudents,
  getSchools,
  getEnrollments,
  createStudent
}


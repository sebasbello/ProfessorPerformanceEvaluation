import { pool } from "../schema/connection.js";

export const deleteStudent = (request) => {
  const registrationNumber = request.body.registrationNumber;
  return Promise.resolve(
    pool.query(
      "DELETE\n" +
      "FROM\n" +
      "student\n" +
      "WHERE\n" +
      "registrationNumber = ?",
      [registrationNumber]
    )
  );
};

export const getStudentByEmailAddress = (request) => {
  const emailAddress = request.body.emailAddress;
  return Promise.resolve(
    pool.query(
      "SELECT\n" +
      "*\n" +
      "FROM\n" +
      "student\n" +
      "WHERE\n" +
      "emailAddress = ?",
      [emailAddress]
    )
  );
};

export const getStudentByPhoneNumber = (request) => {
  const phoneNumber = request.body.phoneNumber;
  return Promise.resolve(
    pool.query(
      "SELECT\n" +
      "*\n" +
      "FROM\n" +
      "student\n" +
      "WHERE\n" +
      "phoneNumber = ?",
      [phoneNumber]
    )
  );
};

export const getStudentByRegistrationNumber = (request) => {
  const registrationNumber = request.body.registrationNumber;
  return Promise.resolve(
    pool.query(
      "SELECT\n" +
      "*\n" +
      "FROM\n" +
      "student\n" +
      "WHERE\n" +
      "registrationNumber = ?",
      [registrationNumber]
    )
  );
};

export const getStudentsByFaculty = (request) => {
  const idFaculty = request.body.idFaculty;
  return Promise.resolve(
    pool.query(
      "SELECT\n" +
      "student.*\n" +
      "FROM\n" +
      "student\n" +
      "INNER JOIN\n" +
      "educationalProgram\n" +
      "ON\n" +
      "student.idEducationalProgram = educationalProgram.idEducationalProgram\n" +
      "INNER JOIN\n" +
      "faculty\n" +
      "ON\n" +
      "educationalProgram.idFaculty = faculty.idFaculty\n" +
      "WHERE\n" +
      "faculty.idFaculty = ?",
      [idFaculty]
    )
  );
};

export const getStudents = () => {
  return Promise.resolve(
    pool.query(
      "SELECT\n" +
      "*\n" +
      "FROM\n" +
      "schoolPeriod"
    )
  );
};

export const patchStudent = (request) => {
  const { 
    registrationNumber,
    name,
    paternalSurname,
    maternalSurname } = request.body;
  return Promise.resolve(
    pool.query(
      "UPDATE\n" +
      "student\n" +
      "SET\n" +
      "name = IFNULL(?, name),\n" +
      "paternalSurname = IFNULL(?, paternalSurname),\n" +
      "maternalSurname = IFNULL(?, maternalSurname),\n" +
      "WHERE\n" +
      "registrationNumber = ?",
      [
        name,
        paternalSurname,
        maternalSurname,
        registrationNumber
      ]
    )
  );
};

export const postStudent = (request) => {
  const {
    registrationNumber,
    name,
    paternalSurname,
    maternalSurname,
    emailAddress,
    idEducationalProgram } = request.body;
  return Promise.resolve(
    pool.query(
      "INSERT INTO\n" +
      "student\n" +
      "(registrationNumber, name, paternalSurname, maternalSurname, emailAddress, idEducationalProgram)\n" +
      "VALUES\n" +
      "(?, ?, ?, ?, ?, ?)",
      [
        registrationNumber,
        name,
        paternalSurname,
        maternalSurname,
        emailAddress,
        idEducationalProgram
      ]
    )
  );
};
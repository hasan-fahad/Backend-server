import { isDeepStrictEqual } from 'util';
import { TStudent } from './student.interface'
import { Student } from './student.model'



// GET

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
//single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

//delete student
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted: true})
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
}
//এটি যাবে এখন কন্ট্রোলারে

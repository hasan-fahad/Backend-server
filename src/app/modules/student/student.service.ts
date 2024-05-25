import { isDeepStrictEqual } from 'util';
import { TStudent } from './student.interface'
import { Student } from './student.model'

//POST
const createStudentIntoDB = async (studentData: TStudent) => {
  
    //built in static method

   if(await Student.isUserExists(studentData.id)){
    throw new Error('User already exists')
   }
   const result = await Student.create(studentData);
//   const student = new Student(studentData);//create an instance
//   if(await  student.isUserExits(studentData.id)){
//     throw new Error('User already exists')
//   }
 
//   const result = await student.save() //built in instance method

  return result
}

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
}
//এটি যাবে এখন কন্ট্রোলারে

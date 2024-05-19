import { Student } from './student.interface';
import { StudentModel } from './student.model';



const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student)
    return result;
}

// GET

const getAllStudentsFromDB = async() => {
    const result = await StudentModel.find()
    return result;
}
//single student
const getSingleStudentFromDB = async(id: string) => {
    const result = await StudentModel.findOne({id})
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
};
//এটি যাবে এখন কন্ট্রোলারে

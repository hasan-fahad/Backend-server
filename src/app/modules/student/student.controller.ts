import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import StudentValidationSchema from './student.zod.validation'


// GET all students Controller

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    })
  } catch (error) {
   next(error);
  }
}

// GET single student Controller

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    })
  } catch (err) {
    next(err);
  }
};

// GET single student Controller

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })
  } catch (err) {
    next(err);
  }
}
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
}
//এখন এটি যাবে route

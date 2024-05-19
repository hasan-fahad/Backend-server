import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body

    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(StudentData)

    //send response

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

// GET all students Controller

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
        success: true,
        message: 'Something went wrong',
        data: error,
      })
  }
}

// GET single student Controller

const getSingleStudent = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
//এখন এটি যাবে route

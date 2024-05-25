import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import StudentValidationSchema from './student.zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using zod

    const { student: StudentData } = req.body
    //Data validation using joi
    // const { error, value } = studentJoiValidationSchema.validate(StudentData)
    // console.log(error, value)

    // data validation using zod

    const zodParsedData = StudentValidationSchema.parse(StudentData);
    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   })
    // }

    //send response

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
     res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    })
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
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
};

// GET single student Controller

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
}
//এখন এটি যাবে route

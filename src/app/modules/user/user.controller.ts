import httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../utils/sendResponse";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
  
      const {password, student: studentData } = req.body
      const result = await UserServices.createStudentIntoDB(password, studentData);

  
      //send response

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result,
  
        })
    } catch (error) {
       next(error);
    }
  }
  
  export const UserControllers = {
    createStudent,
  }
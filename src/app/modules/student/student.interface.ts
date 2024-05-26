
import { Schema, model, connect, Model, Types } from 'mongoose'

//step-1 create type or interface for students
export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNumber: string
  motherName: string
  motherOccupation: string
  motherContactNumber: string
}

export type TUserName = {
  firstName: string
  middleName?: string | undefined
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TStudent = {
  id: string
  user: Types.ObjectId;
  password: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string | undefined
  isDeleted: boolean
}

// for creating statics

export interface StudentModel extends Model<TStudent> {
    isUserExists(id:string): Promise<TStudent| null>
  }


// for creating instance

// export type StudentMethod = {
//   isUserExits(id: string): Promise<TStudent | null>
// }
// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>

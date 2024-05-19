import { Schema, model, connect } from 'mongoose'
import { Student, LocalGuardian, UserName, Guardian } from './student.interface'

// step-2 create a schema for students

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String,
    required: true,
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'], //enu, type ব্যবহার করতে হবে যখন এমন ইউনিয়ন টাইপ থাকবে
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  emergencyContactNumber: {
    type: String,
  },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: {
    type: String,
  },
  isActive: ['active', 'blocked'],
})


// step 3 
// Create model

export const StudentModel = model<Student>('Student', studentSchema);
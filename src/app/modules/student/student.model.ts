import { Schema, model, connect } from 'mongoose'
import { Student, LocalGuardian, UserName, Guardian } from './student.interface'

// step-2 create a schema for students

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true, // এটার মাধ্যমে সামনে পিছনে স্পেস থাকলে রিমুভ করে দিবে।
    maxlength: [20, 'Max allowed Length is 20 characters'], //built in ভ্যালিডেশন এটা
    //Custom Validator
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
    },
    message: '{VALUE} is not a capitalize format'
    }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required']
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
  id: { type: String, required: true, unique: true }, // এখানে unique use করা হয়েছে, যেন ডুব্লিকেট ডাটা না পাওয়া যায়।
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    gender: {
      values: ['male', 'female', 'other'],
      message: "The gender field can only be one of the following: {VALUES}." 
    },
    required: true,
  }, //enu, type ব্যবহার করতে হবে যখন এমন ইউনিয়ন টাইপ থাকবে
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String, required: true, unique: true
  },
  contactNumber: {
    type: String,
  },
  emergencyContactNumber: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
  },
});

// step 3
// Create model

export const StudentModel = model<Student>('Student', studentSchema)

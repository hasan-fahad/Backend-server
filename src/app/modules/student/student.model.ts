import { Schema, model, connect } from 'mongoose'
import {
  TStudent,
  TLocalGuardian,
  TUserName,
  TGuardian,
  StudentModel,
} from './student.interface'
import validator from 'validator'
import bcrypt from 'bcrypt'
import config from '../../config'

// step-2 create a schema for students

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true, // এটার মাধ্যমে সামনে পিছনে স্পেস থাকলে রিমুভ করে দিবে।
    maxlength: [20, 'Max allowed Length is 20 characters'], //built in ভ্যালিডেশন এটা
    //Custom Validator
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return value === firstNameStr
      },
      message: '{VALUE} is not a capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  //built in validator methods
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    validate: {
      validator: (value: string) => {
        validator.isAlpha(value)
      },
      message: '{VALUE} is not a alpha format',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true }, // এখানে unique use করা হয়েছে, যেন ডুব্লিকেট ডাটা না পাওয়া যায়।
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxLength: [20, 'Password can not be more than 20 characters'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    gender: {
      values: ['male', 'female', 'other'],
      message: 'The gender field can only be one of the following: {VALUES}.',
    },
    required: true,
  }, //enum type ব্যবহার করতে হবে যখন এমন ইউনিয়ন টাইপ থাকবে
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// step 3
// Create model

//crating a custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

//pre-save middleware/hook : will work on create() save()

studentSchema.pre('save', async function (next) {
  //  console.log(this, 'pre hook: we will save the data');
  // hashing password and save into db
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next();
});

//post save middleware/hook 
//Post এর মাধ্যমে পাসওয়ার্ড encrypting করে

studentSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we will save the data')
  doc.password = '';
  next();

});



export const Student = model<TStudent, StudentModel>('Student', studentSchema)

import bcrypt from 'bcrypt'
// User Schema

import { model, Schema } from "mongoose";
import TUser from "./user.interface";
import StudentValidationSchema from "../student/student.zod.validation";
import config from '../../config';

const userSchema = new Schema<TUser>({
    id: { 
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxLength: [20, 'Password can not be more than 20 characters'],
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin' , 'student' , 'faculty'],
        required: true
    }, 
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
        
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    
}, {
    timestamps: true, // By default create it mongoose
});

//pre-save middleware/hook : will work on create() save()

userSchema.pre('save', async function (next) {
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
  //set '' after saving password
  userSchema.post('save', function (doc, next) {
    // console.log(this, 'post hook: we will save the data')
    doc.password = '';
    next();
  
  });

export const User = model<TUser>('User', userSchema);
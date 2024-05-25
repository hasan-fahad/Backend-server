const Joi = require('joi');

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().required().max(20).regex(/^[A-Z][a-z]*$/),
  middleName: Joi.string().allow(''),
  lastName: Joi.string().required().regex(/^[A-Za-z]+$/),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNumber: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNumber: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().allow(''),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().allow(''),
  emergencyContactNumber: Joi.string().allow(''),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').allow(''),
  presentAddress: Joi.string().allow(''),
  permanentAddress: Joi.string().allow(''),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().allow(''),
  isActive: Joi.string().valid('active', 'blocked').required(),
});

export default studentJoiValidationSchema;

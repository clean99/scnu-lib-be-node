import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';
import { Role } from '../constant/role';
import {
  validateCollege,
  validateEmail,
  validatePhone,
} from '../utils/validateUtils';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'username required'],
    unique: true,
    minlength: 1,
    maxlength: 16,
  })
  username: string;
  @Prop({
    required: [true, 'email required'],
    lowercase: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Please fill a valid email address.',
    },
  })
  email: string;
  @Prop({ required: [true, 'name required'], maxlength: 16 })
  name: string;
  @Prop({
    required: [true, 'college required'],
    validate: {
      validator: validateCollege,
      message: 'Please fill a valid college.',
    },
  })
  college: string;
  @Prop({ required: [true, 'role required'], min: Role.admin })
  role: number;
  @Prop({
    required: [true, 'student_id required'],
    minlength: 4,
    maxlength: 16,
  })
  student_id: string;
  @Prop({ required: [true, 'wechat required'], maxlength: 40 })
  wechat: string;
  @Prop({
    required: [true, 'phone required'],
    validate: {
      validator: validatePhone,
      message: 'Please fill a valid phone.',
    },
  })
  phone: string;
  @Prop({
    required: [true, 'secret required'],
  })
  secret: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { stage, Tags } from 'src/constant/activity';
import { validateDateBiggerThan } from 'src/utils/validateUtils';
import { User } from './user.schema';

export type ActivityDocument = Activity & Document;

@Schema()
class ApplicantPeople {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user_id: Types.ObjectId;
  @Prop({ require: [true, 'user stage required'], type: String, enum: stage })
  stage: stage;
  @Prop({
    require: false,
    maxlength: 40,
  })
  apply_msg: string;
  @Prop({
    require: false,
    maxlength: 40,
  })
  approval_msg: string;
}
const applicantPeopleSchema = SchemaFactory.createForClass(ApplicantPeople);

@Schema({ timestamps: true })
export class Activity {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: Types.ObjectId;
  @Prop({
    required: [true, 'activity title required'],
    minlength: 1,
    maxlength: 25,
  })
  title: string;
  @Prop({
    required: [true, 'activity register_date required'],
    validate: validateDateBiggerThan,
  })
  register_date: Date;
  @Prop({
    required: [true, 'activity start_date required'],
    validate: function (input) {
      validateDateBiggerThan(input, this?.register_date);
    },
  })
  start_date: Date;
  @Prop({
    required: [true, 'activity end_date required'],
    validate: function (input) {
      validateDateBiggerThan(input, this?.start_date);
    },
  })
  end_date: Date;
  @Prop({
    required: [true, 'activity img required'],
    maxlength: 100,
  })
  img: string;
  @Prop({
    required: [true, 'activity description required'],
    minlength: 4,
    maxlength: 400,
  })
  description: string;
  @Prop({
    required: [true, 'activity max_num_of_people required'],
    min: 1,
  })
  max_num_of_people: number;
  @Prop({
    required: false,
    min: 1,
    validate: function (input) {
      input <= this.max_num_of_people;
    },
  })
  num_of_people: number;
  @Prop({
    required: [true, 'activity spot required'],
    maxlength: 25,
  })
  spot: string;
  @Prop({
    required: [true, 'activity tags required'],
    minlength: 1,
    type: [Number],
    enum: Tags,
  })
  tags: number[];
  @Prop({
    required: [true, 'activity host required'],
    minlength: 1,
    type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
  })
  hosts: Types.ObjectId[];
  @Prop({
    required: false,
    type: [applicantPeopleSchema],
  })
  applicant_people: ApplicantPeople[];
  @Prop({
    required: false,
    type: [applicantPeopleSchema],
  })
  volunteer: ApplicantPeople[];
  @Prop({
    required: false,
  })
  allow_volunteer: boolean;
  @Prop({
    required: false,
  })
  is_delete: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const activity = await this.activityModel.create(createActivityDto);
    return activity;
  }

  async findAll() {
    const activities = await this.activityModel.find().exec();
    return activities;
  }

  async findOne(id: string) {
    const activity = await this.activityModel.findById(id).exec();
    return activity;
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    return this.activityModel.findByIdAndUpdate(id, updateActivityDto, {
      runValidators: true,
    });
  }

  remove(id: string) {
    return this.activityModel.findByIdAndDelete(id);
  }
}

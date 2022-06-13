import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const activity = await this.activityModel.create({
      ...createActivityDto,
      activity_id: uuidv4(),
    });
    return activity;
  }

  async findAll() {
    const activities = await this.activityModel.find().exec();
    return activities;
  }

  async findOne(id: string) {
    const activity = await this.activityModel
      .findOne({ activity_id: id })
      .exec();
    return activity;
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    return this.activityModel.findOneAndUpdate(
      { activity_id: id },
      updateActivityDto,
      {
        runValidators: true,
      },
    );
  }

  remove(id: string) {
    return this.activityModel.findOneAndDelete({ activity_id: id });
  }
}

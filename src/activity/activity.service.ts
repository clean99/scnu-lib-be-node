import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from 'src/schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const newActivity = {
      ...createActivityDto,
      registry_date: new Date(createActivityDto.register_date),
      start_date: new Date(createActivityDto.start_date),
      end_date: new Date(createActivityDto.end_date),
    };
    const activity = await this.activityModel.create(newActivity);
    return activity;
  }

  async findAll() {
    const activities = await this.activityModel.find().exec();
    return activities;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}

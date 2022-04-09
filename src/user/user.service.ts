import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('user not found.');
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('user not found.');
    return await user.updateOne(updateUserDto);
  }

  async remove(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('user not found.');
    return await user.deleteOne();
  }
}

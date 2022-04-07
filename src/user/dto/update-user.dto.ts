import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto,['name','email','college','password','phone','role','student_id','wechat']) {}

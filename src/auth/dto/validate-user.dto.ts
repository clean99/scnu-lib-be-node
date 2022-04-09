import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PickType(RegisterUserDto,['name','email','college','password','phone','role','student_id','wechat']) {}

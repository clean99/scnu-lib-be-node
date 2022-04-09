import { ApiProperty } from '@nestjs/swagger';
export class RegisterUserDto {
  @ApiProperty({
    description: 'username',
  })
  username: string;
  @ApiProperty({
    description: 'email',
  })
  email: string;
  @ApiProperty({
    description: 'name',
  })
  name: string;
  @ApiProperty({
    description: 'college',
  })
  college: string;
  @ApiProperty({
    description: 'role',
  })
  role: number;
  @ApiProperty({
    description: 'student_id',
  })
  student_id: string;
  @ApiProperty({
    description: 'wechat',
  })
  wechat: string;
  @ApiProperty({
    description:
      'phone “XXX-XXXXXXX”、“XXXX-XXXXXXXX”、“XXX-XXXXXXX”、“XXX-XXXXXXXX”、"XXXXXXX"和"XXXXXXXX',
  })
  phone: string;
  @ApiProperty({
    description: 'password, 8-16位，大小写英文+数字',
  })
  password: string;
}

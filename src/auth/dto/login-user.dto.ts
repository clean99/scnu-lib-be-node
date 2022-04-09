import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({
    description: 'username',
  })
  username: string;
  @ApiProperty({
    description: 'password, 8-16位，大小写英文+数字',
  })
  password: string;
}

export class LoginSuccessDto {
    @ApiProperty({
        description: 'jwt',
      })
    acess_token: string;
}
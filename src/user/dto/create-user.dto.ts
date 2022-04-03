import {ApiProperty} from '@nestjs/swagger'
export class CreateUserDto {
    @ApiProperty({
        description:'email'
      })
      email:string;
    @ApiProperty({
        description:'password'
      })
      password:string;
}

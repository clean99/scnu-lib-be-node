import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UserErrorsInterceptor } from './Interceptor/usererrors.interceptor';
import { User } from 'src/schemas/user.schema';
@ApiTags('user')
@Controller('user')
@UseInterceptors(new UserErrorsInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({
    description: 'The user record',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({ status: 401, description: '没有权限' })
  @ApiBadRequestResponse({ status: 500, description:'User validation failed: email: Please fill a valid email address., college: Please fill a valid college., phone: Please fill a valid phone., password: 请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字的密码.'})
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    console.log(result);
    return result;
  }
  @ApiOkResponse({
    description: 'The user records',
    type: CreateUserDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ status: 401, description: '没有权限' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @ApiOkResponse({
    description: 'The user records',
    type: CreateUserDto
  })
  @ApiNotFoundResponse({description:'user not found.'})
  @ApiBadRequestResponse({ status: 401, description: '没有权限' })
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
  @ApiOkResponse({
    description: 'The user record',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({description:'user not found.'})
  @ApiBadRequestResponse({ status: 401, description: '没有权限' })
  @ApiBadRequestResponse({ status: 500, description:'User validation failed: email: Please fill a valid email address., college: Please fill a valid college., phone: Please fill a valid phone., password: 请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字的密码.'})
  @Put(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(username, updateUserDto);
  }
  @ApiOkResponse({description:'ok.'})
  @ApiNotFoundResponse({description:'user not found.'})
  @ApiBadRequestResponse({ status: 401, description: '没有权限' })
  @ApiBadRequestResponse()
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserErrorsInterceptor } from './Interceptor/usererrors.interceptor';
import { Role } from '../constant/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('user')
@Controller('user')
@UseInterceptors(new UserErrorsInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({
    description: 'The user record',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadRequestResponse({
    status: 500,
    description:
      'User validation failed: email: Please fill a valid email address., college: Please fill a valid college., phone: Please fill a valid phone., password: 请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字的密码.',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }
  @ApiOkResponse({
    description: 'The user records',
    type: CreateUserDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadRequestResponse({
    status: 500,
    description: 'only admin and manager can get user profile',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  findAll(@Request() Req) {
    if (
      !Req.user ||
      (Req.user.role !== Role.admin && Req.user.role !== Role.manager)
    )
      throw new UnauthorizedException(
        undefined,
        'only admin and manager can get user profile',
      );
    return this.userService.findAll();
  }
  @ApiOkResponse({
    description: 'The user records',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({ description: 'user not found.' })
  @ApiBadRequestResponse({
    status: 500,
    description: 'only admin and manager can get user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  findOne(@Request() Req, @Param('username') username: string) {
    if (
      !Req.user ||
      (Req.user.role !== Role.admin && Req.user.role !== Role.manager)
    )
      throw new UnauthorizedException(
        undefined,
        'only admin and manager can get user profile',
      );
    return this.userService.findOne(username);
  }
  @ApiOkResponse({
    description: 'The user record',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({ description: 'user not found.' })
  @ApiBadRequestResponse({
    status: 500,
    description: 'only admin can update user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    status: 500,
    description:
      'User validation failed: email: Please fill a valid email address., college: Please fill a valid college., phone: Please fill a valid phone., password: 请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字的密码.',
  })
  @Put(':username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  update(
    @Request() Req,
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!Req.user || Req.user.role !== Role.admin)
      throw new UnauthorizedException(
        undefined,
        'only admin can update user profile',
      );
    return this.userService.update(username, updateUserDto);
  }
  @ApiOkResponse({ description: 'ok.' })
  @ApiNotFoundResponse({ description: 'user not found.' })
  @ApiBadRequestResponse({
    status: 500,
    description: 'only admin can delete user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse()
  @Delete(':username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  remove(@Request() Req, @Param('username') username: string) {
    if (!Req.user || Req.user.role !== Role.admin)
      throw new UnauthorizedException(
        undefined,
        'only admin can delete user profile',
      );
    return this.userService.remove(username);
  }
}

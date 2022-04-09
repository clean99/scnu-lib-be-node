import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginSuccessDto, LoginUserDto } from './auth/dto/login-user.dto';
import { RegisterUserDto } from './auth/dto/register-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local')) // refer to auth/local.strategy.ts
  @ApiOkResponse({
    description: 'Login success. return with jwt.',
    type: LoginSuccessDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ status: 404, description: 'user not found.' })
  @Post('auth/login')
  async login(@Body() body: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }
  @ApiOkResponse({
    description: 'The user record',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    status: 500,
    description:
      'User validation failed: email: Please fill a valid email address., college: Please fill a valid college., phone: Please fill a valid phone., password: 请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字的密码.',
  })
  @Post('auth/register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() req) {
    return req.user;
  }
}

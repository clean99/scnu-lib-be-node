import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constant/crypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user && user.secret && (await bcrypt.compare(pass, user.secret))) {
      const { secret, ...result } = user;
      return result;
    }
    return null;
  }
  async registerUser(user: RegisterUserDto) {
    const secret = await bcrypt.hash(user.password, SALT_ROUNDS);
    return this.userService.create({ ...user, secret });
  }
  async login(user: any) {
    const userId = user?._doc?._id?.toString();
    const username = user?._doc?.username;
    const role = user?._doc?.role;
    if (!userId) throw new UnauthorizedException();
    const payload = { username, sub: userId, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

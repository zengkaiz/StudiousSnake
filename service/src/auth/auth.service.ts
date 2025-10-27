import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;

    // 检查用户是否已存在
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('用户已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      username,
    });

    // 生成Token
    const tokens = await this.generateTokens(user);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
        },
        tokens,
      },
    };
  }

  async login(user: any) {
    const tokens = await this.generateTokens(user);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        tokens,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }

      const tokens = await this.generateTokens(user);

      return {
        success: true,
        data: { tokens },
      };
    } catch (error) {
      throw new UnauthorizedException('Token无效');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async generateTokens(user: any) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostCreateUserDto, LoginUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(postCreateUserDto: PostCreateUserDto): Promise<any> {
    try {
      // Check if user exists
      const userExistsUsername = await this.userService.findByUsername(
        postCreateUserDto.username,
      );
      if (postCreateUserDto.password !== postCreateUserDto.rePassword) {
        throw new BadRequestException('Password do not match');
      }

      if (userExistsUsername) {
        throw new BadRequestException('User already exists');
      }

      // Hash password
      const hash = await this.hashData(postCreateUserDto.password);
      const newUser = await this.userService.create({
        username: postCreateUserDto.username,
        password: hash,
        refreshToken: '',
      });

      const tokens = await this.getTokens(newUser._id, newUser.username);
      await this.updateRefreshToken(newUser._id, tokens.refreshToken);
      return {
        ...tokens,
      };
    } catch (error) {
      throw new BadRequestException('Register Fail');
    }
  }

  async signIn(data: LoginUserDto) {
    try {
      // Check if user exists
      const user = await this.userService.findByUsername(data.username);
      if (!user)
        throw new UnauthorizedException('Username or Password is incorrect');
      const passwordMatches = await bcrypt.compareSync(
        data.password,
        user.password,
      );
      if (!passwordMatches)
        throw new UnauthorizedException('Username or Password is incorrect');
      const tokens = await this.getTokens(user._id, user.username);
      await this.updateRefreshToken(user._id, tokens.refreshToken);
      return {
        token: tokens.accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }
  }

  async logout(userId: mongoose.Types.ObjectId) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, Number(process.env.SALT_OR_ROUNDS));
  }

  async updateRefreshToken(
    userId: mongoose.Types.ObjectId,
    refreshToken: string,
  ) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: mongoose.Types.ObjectId, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: process.env.JWT_SECRET_ACCESS_TOKEN,
          expiresIn: '7d',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_TOKEN,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }
}

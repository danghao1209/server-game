import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import * as mongoose from 'mongoose';
import { PostAddCoinsDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  async findById(@Request() req, @Res() res: Response) {
    try {
      const user = await this.usersService.findById(
        new mongoose.Types.ObjectId(req.user.id),
      );
      return res.status(HttpStatus.OK).json({
        _id: user._id,
        username: user.username,
        password: user.password,
        coin: user.coin,
        gem: user.gem,
        upgrade: user.upgrade,
        avatar: user.avatar,
        pet: user.pet,
        character: user.character,
        isActive: user.isActive,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Something went wrong',
        });
      }
    }
    return;
  }

  @UseGuards(AccessTokenGuard)
  @Post('addcoin')
  async addCoin(
    @Request() req,
    @Body()
    data: PostAddCoinsDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.addCoin(
        new mongoose.Types.ObjectId(req.user.id),
        data.coin,
      );

      return res.status(HttpStatus.OK).json({
        _id: user._id,
        username: user.username,
        password: user.password,
        coin: user.coin,
        upgrade: user.upgrade,
        avatar: user.avatar,
        isActive: user.isActive,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Something went wrong',
        });
      }
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(
      new mongoose.Types.ObjectId(id),
      updateUser,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(new mongoose.Types.ObjectId(id));
  }
}

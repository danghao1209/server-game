import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { UpgradeService } from './upgrade.service';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { LevelUpUpgrade } from './dto/upgrade.dto';
import { UserService } from 'src/user/user.service';
import mongoose from 'mongoose';
@Controller('upgrade')
export class UpgradeController {
  constructor(
    private readonly upgradeService: UpgradeService,
    private readonly usersService: UserService,
  ) {}

  @Get('all')
  async getAll(@Res() res: Response) {
    try {
      const allPet = await this.upgradeService.getAll();

      return res.status(HttpStatus.OK).json(allPet);
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
  @Post('levelup')
  async levelUp(
    @Request() req,
    @Body()
    data: LevelUpUpgrade,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.findById(
        new mongoose.Types.ObjectId(req.user.id),
      );
      console.log(user.upgrade);
      if (user.upgrade == 10) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Level is maxed',
        });
      }

      const nextLevel = await this.upgradeService.getNextLevel(
        user.upgrade + 1,
      );

      if (user.coin < nextLevel.coinCost) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Not enough coins',
        });
      } else {
        user.coin =
          parseInt(user.coin.toString()) -
          parseInt(nextLevel.coinCost.toString());
        user.upgrade = parseInt(user.upgrade.toString()) + 1;
      }

      this.usersService.saveUser(user._id, user.coin, user.upgrade);

      return res.status(HttpStatus.OK).json(user);
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
}

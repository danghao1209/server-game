import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
//import * as mongoose from 'mongoose';
import { Response } from 'express';
import { UpgradeService } from 'src/upgrade/upgrade.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { PostCreateUpgrade } from 'src/upgrade/dto/upgrade.dto';
import { PostCreatePet } from 'src/pet/dto/pet.dto';
import { PetService } from 'src/pet/pet.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly upgradeService: UpgradeService,
    private readonly petService: PetService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('create_upgrade')
  async createUpgrade(
    @Body()
    data: PostCreateUpgrade,
    @Res() res: Response,
  ) {
    try {
      const upgrade = await this.upgradeService.create(data);
      return res.status(HttpStatus.OK).json(upgrade);
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
  @Post('create_pet')
  async createPet(
    @Body()
    data: PostCreatePet,
    @Res() res: Response,
  ) {
    try {
      const upgrade = await this.petService.create(data);
      return res.status(HttpStatus.OK).json(upgrade);
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

  @Get()
  getTestData() {
    return 'hhi';
  }
}

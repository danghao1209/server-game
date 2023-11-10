import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { Response } from 'express';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('all')
  async getAll(@Res() res: Response) {
    try {
      const allPet = await this.petService.getAll();
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
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Upgrade, UpgradeDocument } from './schema/upgrade.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PostCreateUpgrade } from './dto/upgrade.dto';
@Injectable()
export class UpgradeService {
  constructor(
    @InjectModel(Upgrade.name)
    private upgradeModel: mongoose.Model<UpgradeDocument>,
  ) {}

  async create(createUserDto: PostCreateUpgrade): Promise<UpgradeDocument> {
    try {
      const newUser = new this.upgradeModel({
        ...createUserDto,
      });

      return await newUser.save();
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }

  async getAll(): Promise<UpgradeDocument[]> {
    try {
      return await this.upgradeModel.find({}, '-createdAt -updatedAt -__v');
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }

  async getNextLevel(level: number): Promise<UpgradeDocument> {
    try {
      return await this.upgradeModel.findOne(
        { upgradeLevel: level },
        '-createdAt -updatedAt -__v',
      );
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }
}

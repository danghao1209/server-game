import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetDocument } from './schema/pet.schema';
import * as mongoose from 'mongoose';
import { PostCreatePet } from './dto/pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name)
    private petModel: mongoose.Model<PetDocument>,
  ) {}

  async create(createUserDto: PostCreatePet): Promise<PetDocument> {
    try {
      const newUser = new this.petModel({
        ...createUserDto,
      });

      return await newUser.save();
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }

  async getAll(): Promise<PetDocument[]> {
    try {
      return await this.petModel.find({}, '-createdAt -updatedAt -__v');
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }

  async getById(id: mongoose.Types.ObjectId): Promise<PetDocument> {
    try {
      return await this.petModel.findOne(
        { _id: id },
        '-createdAt -updatedAt -__v',
      );
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating upgrade');
    }
  }
}

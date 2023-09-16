import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(User.name)
    private userModal: mongoose.Model<User>,
  ) {}

  async findUser(user): Promise<User[]> {
    const users = await this.userModal.find(user);
    return users;
  }
}

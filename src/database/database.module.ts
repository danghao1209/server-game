import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}

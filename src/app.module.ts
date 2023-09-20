import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { SocketModule } from './socket/socket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { UpgradeModule } from './upgrade/upgrade.module';
import { PetModule } from './pet/pet.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    //MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
    DatabaseModule,
    SocketModule,
    RedisModule,
    UpgradeModule,
    PetModule,
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

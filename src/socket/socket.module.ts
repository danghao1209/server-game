import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { AuthService } from 'src/auth/auth.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [SocketController, RedisModule],
  providers: [SocketService, AuthService],
})
export class SocketModule {}

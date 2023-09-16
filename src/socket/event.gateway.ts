import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(@Inject(AuthService) private readonly authService: any) {}

  afterInit(socket: Socket) {}

  handleConnection(socket: Socket) {
    const authHeader = socket.handshake.headers.authorization;
    if (authHeader && (authHeader as string).split(' ')[1]) {
      try {
      } catch (error) {}
    } else {
      socket.disconnect();
    }
  }
  handleDisconnect(socket: Socket) {}
}

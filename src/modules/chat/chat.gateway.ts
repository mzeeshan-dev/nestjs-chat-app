import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessageService } from '../message/message.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  // namespace: '/chat',
  // give access to the socket.io server
  cors: {
    origin: '*',
  },
}) // interfaces to log some key states of our application
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private msgService: MessageService,
  ) {}

  @WebSocketServer() // creates websockets server instance
  server: Server;

  afterInit() {
    console.log(`Gateway Initialized`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      // const decodedToken = await this.authService.verifyJWT(
      //   client.handshake.headers.authorization,
      // );
      // const user = await this.userService.findOneById(decodedToken.id);

      if (true) {
        // connect the user to the socket
        console.log(`Client Connected: ${client.id}`);
      } else {
        // disconnect the user from the socket
        return this.disconnectUser(client);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string) {
    this.server.emit('msgToClient', payload);

    // create message in the database
    return this.msgService.createMessage({
      sender_id: 1,
      receiver_id: 2,
      message: payload,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: string) {
    client.join('aRoom');
    client.to('aRoom').emit('roomCreated', { room: 'aRoom' });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: string) {
    client.leave(payload);
    client.emit('leftRoom', payload);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  private disconnectUser(socket: Socket) {
    socket.emit('Error', 'You are not authorized to access this page');
    socket.disconnect();
  }
}

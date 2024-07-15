import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CardNotificationDto } from './dto/notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  server: Server;

  @SubscribeMessage('cardUpdated')
  handleCardStatusChanged(@MessageBody() notification: CardNotificationDto){
    // 클라이언트에게 알림 전송
    console.log(notification.message)
    this.server.emit('cardUpdated', notification);
  }

  afterInit(server: Server) {
    this.server = server;
    console.log('Socket.IO 서버가 초기화되었습니다.');
  }

  handleConnection(client: Socket) {
    console.log(`클라이언트가 연결되었습니다: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`클라이언트가 연결이 해제되었습니다: ${client.id}`);
  }
}

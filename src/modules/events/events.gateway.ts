import {
  WebSocketGateway,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { CardNotificationDto } from "./dto/notification.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})

export class EventsGateway {
  private server: Server;

  @SubscribeMessage('cardUpdated')
  handleCardStatusChanged(notification: CardNotificationDto){
    this.server.emit('cardUpdated', notification);
  }

  async createNotificationMessage(cardId: number, changedFields: string[], oldCard: string, newCard: string){
    const fieldMessages: { [key: string]: string } = {
      cardTitle: `제목이 ${oldCard}에서 ${newCard}로 변경되었습니다.`,
      content: '내용이 변경되었습니다.',
      backgroundColor: '배경색이 변경되었습니다.',
      cardMember: '멤버가 변경되었습니다.',
    };

    const messages = changedFields.map(field => fieldMessages[field]);
    return `카드 ${cardId}: ${messages.join(' ')}`;
  }

  afterInit(server: Server) {
    this.server = server;
    console.log("Socket.IO 서버가 초기화되었습니다.");
  }

  handleConnection(client: Socket) {
    console.log(`클라이언트가 연결되었습니다: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`클라이언트가 연결이 해제되었습니다: ${client.id}`);
  }
}
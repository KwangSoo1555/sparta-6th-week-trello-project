import {
  WebSocketGateway,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { CardNotificationDto } from "./dto/notification.dto";
import { MESSAGES } from "src/common/constants/messages.constant";

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
      content: MESSAGES.EVENTS.UPDATE_CONTENT_SUCCED ,
      backgroundColor: MESSAGES.EVENTS.UPDATE_BACKGROUNDCOLOR_SUCCED,
      cardMember: MESSAGES.EVENTS.UPDATE_CARDMEMBER,
    };

    const messages = changedFields.map(field => fieldMessages[field]);
    return `카드 ${cardId}: ${messages.join(' ')}`;
  }

  afterInit(server: Server) {
    this.server = server;
    console.log(MESSAGES.EVENTS.INIT_SOCKET_IO_SERVER);
  }

  handleConnection(client: Socket) {
    console.log(MESSAGES.EVENTS.CONNECT_TO_CLIENT, `${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(MESSAGES.EVENTS.INCONNECT_TO_CLIENT, `${client.id}`);
  }
}
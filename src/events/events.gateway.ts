import {
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

class ChatUser {
    username: string;
    id: string;
}

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    HashObject: Object = {};

    @SubscribeMessage('chat message')
    async extraHeader(@MessageBody() data: any): Promise<void> {
        this.server.sockets.connected[data[1]].emit('chat message', data[0]);
    }

    async handleConnection(client: Socket): Promise<void> {
        let ua: ChatUser = new ChatUser();
        ua.username = client.conn.request.headers.username;
        ua.id = client.id;
        if (this.HashObject[ua.id] == null)
        {
            this.HashObject[ua.id] = ua;
            this.server.sockets.emit('new user', ua);
            client.emit('all users', this.HashObject);
        }
    }

    async handleDisconnect(client: Socket): Promise<void> {
        let id:string = client.id;
        delete this.HashObject[id];
        this.server.sockets.emit('delete user', id);
    }
}

export class RoomManager {
    private rooms: Map<string, any>;

    constructor() {
        this.rooms = new Map();
    }

    getRooms() {
        return this.rooms;
    }

    getRoom(roomId: string){
        return this.rooms.get(roomId);
    }

    createRoom(roomId: string){
        this.rooms.set(roomId, { players: [] });
    }

    joinRoom(roomId: string, playerId: string){
        if(!this.rooms.has(roomId)) {
            throw new Error("Room does not exist");
        }
        const room = this.rooms.get(roomId);
        room.players.push(playerId);
        this.rooms.set(roomId, room);
    }

    exitRoom(roomId: string, playerId: string){
        if(!this.rooms.has(roomId)) {
            throw new Error("Room does not exist");
        }
        const room = this.rooms.get(roomId);
        room.players = room.players.filter((id: string) => id !== playerId);
        this.rooms.set(roomId, room);
    }   
}

export const roomManager = new RoomManager();
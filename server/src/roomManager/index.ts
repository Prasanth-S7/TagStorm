interface Player {
    playerId: string;
    admin: boolean;
    socketId?: string;
    x: number;
    y: number;
    isIt: boolean;
}
export class RoomManager {
    private rooms: Map<string, Player[]>;

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
        this.rooms.set(roomId, []);
    }

    joinRoom(roomId: string, playerId: string, socketId: string) {
        const players = this.rooms.get(roomId);
        
        if (!players) {
            throw new Error("Room does not exist");
        }

        const isAdmin = players.length === 0;
        players.push({ 
            playerId, 
            socketId, 
            admin: isAdmin, 
            x: 0,
            y: 0, 
            isIt: false 
        });
    }

    exitRoom(roomId: string, playerId: string, socketId: string) {
        const players = this.rooms.get(roomId);
        if (!players) {
            return;
        }
        const leavingPlayer = players.find(p => p.playerId === playerId && p.socketId === socketId);
        const wasAdmin = leavingPlayer?.admin;
        const updatedPlayers = players.filter(p => p.playerId !== playerId);

        if (updatedPlayers.length === 0) {
            this.rooms.delete(roomId);
            return;
        }
        if (wasAdmin) {
            const nextAdmin = updatedPlayers[0];
            if (nextAdmin) {
                nextAdmin.admin = true;
            }
        }
        this.rooms.set(roomId, updatedPlayers);
    }

    updatePosition(roomId: string, socketId: string, x: number, y: number): boolean {
        const players = this.rooms.get(roomId);
        if (!players) return false;
        const player = players.find(p => p.socketId === socketId);
        if (!player) return false;
        player.x = x;
        player.y = y;
        return true;
    }
}

export const roomManager = new RoomManager();
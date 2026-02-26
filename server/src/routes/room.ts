import express from 'express';
import type { Request, Response, Router } from 'express';
import { roomManager } from '../roomManager/index.js';

export const room: Router = express.Router();

room.post('/create', (req: Request, res: Response) => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    roomManager.createRoom(newRoomId);
    res.json({ roomId: newRoomId });
})

room.post("/join/:roomId", (req: Request, res: Response) => {
    const roomId = req.params.roomId as string;
    const playerId = req.body.playerId as string;
    if(roomId == null || roomId == undefined || roomId.trim() === "") {
        return res.status(400).json({ error: "Invalid room ID" });
    }
    const roomDetails = roomManager.getRoom(roomId);
    if(!roomDetails) {
        return res.status(404).json({ error: "Room does not exist" });
    }
    roomManager.joinRoom(roomId, playerId)
    res.json(roomDetails);
})

room.post("/exit/:roomId", (req: Request, res: Response) => {
    const roomId = req.params.roomId as string;
    const playerId = req.body.playerId as string;
    if(roomId == null || roomId == undefined || roomId.trim() === "") {
        return res.status(400).json({ error: "Invalid room ID" });
    }
    const roomDetails = roomManager.getRoom(roomId);
    if(!roomDetails) {
        return res.status(404).json({ error: "Room does not exist" });
    }
    roomManager.exitRoom(roomId, playerId)
    res.json(roomDetails);
})
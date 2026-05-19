interface RoomUser{
    socketId: string,
    userId: string,
    username: string
}

interface Room{
    roomId: string
    users: RoomUser[]
}

export const rooms = new Map<string, Room>()
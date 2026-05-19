import { Socket } from "socket.io";
import { IUser } from "../../modules/auth/user.model";

export interface AuthenticatedSocket extends Socket{
    user?: IUser
}
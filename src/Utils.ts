import { connection as WebSocketConnection } from "websocket";

type SendFunction = (action: string, payload: any, tag: string, altConnection?: WebSocketConnection) => void;
type ReplyFunction = (payload: Promise<any> | any) => void

export {SendFunction, ReplyFunction}
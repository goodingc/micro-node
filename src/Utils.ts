type SendFunction = (action: string, payload: any, tag: string) => void;
type ReplyFunction = (payload: any) => void

export {SendFunction, ReplyFunction}
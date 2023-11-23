export interface LoginProps {
}

export interface RegisterProps{
}

export interface MainPageProps{
    user: any;
}

export interface ChatAppProps{
    open: boolean,
    onClose: () => void,
    users: any,
    onChat: any
}

export interface ChatWindowProps{
    chat: any,
    currUser: any,
    onSendMessage: (user: any, message: string) => void
}
export interface MessageType{
    sender: string,
    content: string,
    timestamp: Date
}
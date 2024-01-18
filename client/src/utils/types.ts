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
    groups: any,
    onChat: any,
    onGroup: (group: any) => void
}

export interface ChatWindowProps{
    users:any
    isGroup: boolean
    chat: any,
    currUser: any,
    onSendMessage: (user: any, message: string) => void,
    fetchChat: (group: any) => void
}
export interface MessageType{
    sender: string,
    content: string,
    timestamp: Date
}

export interface AddUserToGroupDialogProps{
    users:any,
    groupId: string,
    groupUsers: any,
    fetchChat: (group: any) => void
}

export interface RemoveUserFromGroupProps{
    users:any,
    groupUsers:any,
    groupId: string,
    fetchChat: (group: any) => void
}

export interface TwoFactorAuthFormProps {
    userId: string;
}

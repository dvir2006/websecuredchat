import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ChatAppProps } from "../../utils/types";


const ChatApp: React.FC<ChatAppProps> = ({open,onClose,users,onChat}) => { 
    return (
        <Drawer variant="temporary" open={open} onClose={onClose}>
            <List>
            {users.map((user: any, index: any) => (
            <ListItem button key={index} onClick={() => onChat(user)}>
                <ListItemText primary={user.username} />
            </ListItem>
            ))}
            </List>
        </Drawer>
    );
};

export default ChatApp;

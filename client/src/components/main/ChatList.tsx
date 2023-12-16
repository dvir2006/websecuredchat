import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ChatAppProps } from "../../utils/types";


const ChatApp: React.FC<ChatAppProps> = ({open,onClose,users,onChat,groups,onGroup}) => { 
    return (
        <Drawer variant="temporary"  open={open} onClose={onClose}>
            <h2>Users</h2>
            <Divider/>
            <List>
            {users.map((user: any, index: any) => (
            <ListItem button key={index} onClick={() => onChat(user)}>
                <ListItemText primary={user.username} />
            </ListItem>
            ))}
            <Divider/>
            <h2>Groups</h2>
            <Divider/>
            </List>
            <List>
            {groups.map((group: any, index: any) => (
            <ListItem button key={index} onClick={() => onGroup(group)}>
                <ListItemText primary={group.name} />
            </ListItem>
            ))}
            </List>
        </Drawer>
    );
};

export default ChatApp;

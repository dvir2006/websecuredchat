import { Button } from "@mui/material";
import { username } from "../../utils/signals";
import { MainPageProps } from "../../utils/types";

const ChatApp: React.FC<MainPageProps> = ({user}) => { 
    const onLogout = () => {
        const token = localStorage.getItem('jwtToken');
        
    };
    return (
        <div>
            <h1>Hello {username.value}</h1>
            <Button variant="contained" onClick={onLogout}>Logout</Button>
        </div>
    );
}

export default ChatApp;

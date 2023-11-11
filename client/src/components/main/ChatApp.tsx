import { Button } from "@mui/material";
import { auth } from "../../utils/signals";
import { MainPageProps } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ChatApp: React.FC<MainPageProps> = ({user}) => { 
    const { logout } = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem('jwtToken');
        logout();
        navigate("/login");
    };
    return (
        <div>
            <h1>Hello {user}</h1>
            <Button variant="contained" onClick={onLogout}>Logout</Button>
        </div>
    );
}

export default ChatApp;

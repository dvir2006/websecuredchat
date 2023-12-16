import { Button } from "@mui/material";
import { username } from "../../utils/signals";
import { MainPageProps } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { ProtectedGetRequest, ProtectedPostRequest, apiUrl } from "../../services/Server";
import CreateGroupDialog from "./CreateGroupDialog";

const ChatApp: React.FC<MainPageProps> = ({user}) => { 
    const { logout,userId } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users,setUsers] = useState([]);
    const [groups,setGroups] = useState([]);
    const [chat,setChat] = useState({messages: []});
    const [currUser,setCurrUser] = useState({username: ""});
    const [isGroup,setIsGroup] = useState(false);
    const onLogout = () => {
        localStorage.removeItem('jwtToken');
        logout();
        navigate("/login");
    };

    const fetchAllUsers = async () => {
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedGetRequest(`${apiUrl}/auth/all-users`,jwtToken);
        if(response.ok) {
            const data = await response.json();
            setUsers(data);
        }
        else onLogout();
    };

    const fetchAllGroups = async () => {
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedGetRequest(`${apiUrl}/chat/get-groups`,jwtToken);
        if(response.ok) {
            const data = await response.json();
            setGroups(data);
        }
        else onLogout();
    };

    const fetchChat = async (user: any) => {
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedPostRequest(`${apiUrl}/chat/get-chat`, {type:"private", senderId: userId, receiverId: user._id},jwtToken);
        if(response.ok) {
            const data = await response.json();
            setChat(data);
            setCurrUser(user);
            setIsGroup(false);
        }
        else onLogout();
    };

    const fetchGroupChat = async (group: any) => {
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedPostRequest(`${apiUrl}/chat/get-chat`, {type:"group", senderId: userId, receiverId: group.uid},jwtToken);
        if(response.ok) {
            const data = await response.json();
            setChat(data);
            setCurrUser(group);
            setIsGroup(true);
        }
        else onLogout();
    };
    
    useEffect( () => {
        const fetchData = async () => {
            await fetchAllUsers();
            await fetchAllGroups();
            if(currUser.username !== ""){
                await fetchChat(currUser);
            }
        };
        
        const interval = setInterval(fetchData,5000); 
        return () => clearInterval(interval);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sendMessageToServer = async (user: any, message: string) => {
        if (message.trim() === '') return;
    
        const requestBody = {
            senderId: userId, 
            receiverId: user._id, 
            messageContent: message,
        };
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedPostRequest(`${apiUrl}/chat/send-message`, requestBody, jwtToken);
    
        if (response.ok) {
            fetchChat(currUser);
        } else {
            alert("Error trying to send message");
            onLogout();
        }
    };
    
    return (
        <div>
            <h1>Hello {user}</h1>
            <CreateGroupDialog/>
            <div>
                <ChatList open={isSidebarOpen} onClose={toggleSidebar} users={users} groups={groups} onChat={fetchChat} onGroup={fetchGroupChat} />
                <ChatWindow chat={chat} currUser={currUser} onSendMessage={sendMessageToServer} isGroup={isGroup} users={users}/>
                <Button variant="contained" onClick={toggleSidebar}>Toggle Sidebar</Button>
            </div>
            <Button variant="contained" onClick={onLogout}>Logout</Button>
        </div>
    );
}

export default ChatApp;

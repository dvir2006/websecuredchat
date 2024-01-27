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
    const [currUser,setCurrUser] = useState<any>({username: ""});
    const [isGroup,setIsGroup] = useState(false);
    //initialize indexedDB with useAuth to get user id
    const initDB = (chatId: string) => {
        return new Promise<IDBDatabase | null>((resolve) => {
            let dbVersion = 1;
            const dbName = `ChatDB_${userId}`;
    
            const request = indexedDB.open(dbName, dbVersion);
            let db: IDBDatabase;
            request.onupgradeneeded = () => {
                db = request.result;
          
                // if the data object store doesn't exist, create it
                if (!db.objectStoreNames.contains(chatId)) {
                  console.log(`Creating ${chatId} store`);
                  db.createObjectStore(chatId, { keyPath: 'id' });
                }
                // no need to resolve here
              };
          
              request.onsuccess = () => {
                db = request.result;
                dbVersion = db.version;
                console.log('request.onsuccess - initDB', dbVersion);
                resolve(db);
              };
          
              request.onerror = () => {
                resolve(null);
              };
        });
    };
    const saveMessageToDB = async (messages: any, uid: string) => {
        let db = await initDB(uid);
        return new Promise((resolve) => {
            const request = indexedDB.open(`ChatDB_${userId}`, 1);
        
            request.onsuccess = () => {
                console.log('request.onsuccess - addData', messages);
                db = request.result;
                const tx = db.transaction(uid, 'readwrite');
                const store = tx.objectStore(uid);
                for (const message of messages)
                {
                    store.add(message);
                }
                resolve(true);
            };
        
            request.onerror = () => {
                const error = request.error?.message
                if (error) {
                resolve(error);
                } else {
                resolve('Unknown error');
                }
            };
        });
    };

    
    const fetchMessagesFromDB = async () => {
        try {
            let uid = isGroup ? currUser.uid : currUser._id;
            const db = await initDB(uid);
            if (db) {
                return new Promise((resolve, reject) => {
                    const transaction = db.transaction([uid], "readonly");
                    const store = transaction.objectStore(uid);
        
                    const request = store.getAll();
        
                    request.onsuccess = () => {
                        resolve(request.result);
                    };
        
                    request.onerror = (event) => {
                        console.error("Error fetching messages:", (event.target as IDBOpenDBRequest).error);
                        reject(((event.target as IDBOpenDBRequest).error));
                    };
        
                    transaction.oncomplete = () => {
                        db.close();
                    };
                });
            }
        } catch (error) {
            console.error("Error opening IndexedDB:", error);
            // Handle the error or throw it again if needed
            throw error;
        }
    };
    

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
            setGroups(data.chats);
        }
        else onLogout();
    };

    const fetchChat = async (user: any) => {
        //const jwtToken = localStorage.getItem('jwtToken') || "";
        //const data = await response.json();
        //setChat(data);
        setCurrUser(user);
        setIsGroup(false);
        const messages: any = await fetchMessagesFromDB();
        console.log(messages);
        if(messages) setChat({ messages });
        
        
    };

    const fetchNewMessages = async (user: any) => {
        const jwtToken = localStorage.getItem('jwtToken') || "";
        let uid = "", type = "private";
        if(isGroup) {
            type = "group";
            uid = currUser.uid;
        }
        else {
            uid = currUser._id;
        }
        const response = await ProtectedPostRequest(`${apiUrl}/chat/get-new-messages`, {type, receiverId: uid},jwtToken);
        if(response.ok) {
            const data = await response.json();
            await saveMessageToDB(data.messages,uid);
        }
        else onLogout();
    };

    const fetchGroupChat = async (group: any) => {
        setCurrUser(group);
        setIsGroup(true);
        const messages: any = await fetchMessagesFromDB();
        if(messages) setChat({ messages });
    };
    
    useEffect( () => {
        const fetchData = async () => {
            await fetchAllUsers();
            await fetchAllGroups();
            if(currUser.username !== "" ){
                await fetchNewMessages(currUser);
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
        
        let requestBody : any = {
            senderId: userId, 
            messageContent: message,
        };

        if(isGroup) {
            requestBody.groupId = user.uid;
        }
        else {
            requestBody.receiverId = user._id;
        }
        const jwtToken = localStorage.getItem('jwtToken') || "";
        const response = await ProtectedPostRequest(`${apiUrl}/chat/send-message`, requestBody, jwtToken);
        console.log(response);
        if (response.ok) {
            await fetchNewMessages(currUser);
            if(!isGroup) {
                fetchChat(currUser);
            }
            else {
                fetchGroupChat(currUser);
            }
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
                <ChatWindow chat={chat} currUser={currUser} onSendMessage={sendMessageToServer} isGroup={isGroup} users={users} fetchChat={fetchGroupChat}/>
                <Button variant="contained" onClick={toggleSidebar}>Toggle Sidebar</Button>
            </div>
            <Button variant="contained" onClick={onLogout}>Logout</Button>
        </div>
    );
}

export default ChatApp;


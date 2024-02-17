import React from "react"
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import { MainPageProps } from "../utils/types";
import ChatApp from "../components/main/ChatApp";
import { Box } from "@mui/system";


const LoginPage: React.FC<MainPageProps> = ({user}) => { 
    return (
        <div>
            <Box sx = {{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            position:"fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "background.default"}}>
            <Header />
            <main style={{flex: "1 1 auto"}}>
                <ChatApp user={user}/>
            </main>
            <Footer />
            </Box>
        </div>
    );
}

export default LoginPage;

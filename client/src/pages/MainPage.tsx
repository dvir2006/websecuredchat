import React from "react"
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import { MainPageProps } from "../utils/types";
import ChatApp from "../components/main/ChatApp";


const LoginPage: React.FC<MainPageProps> = ({user}) => { 
    return (
        <div>
            <Header />
            <main>
                <ChatApp user={user}/>
            </main>
            <Footer />
        </div>
    );
}

export default LoginPage;

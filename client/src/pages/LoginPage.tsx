import React from "react"
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Login from "../components/auth/Login";
import { LoginProps } from "../utils/types";


const LoginPage: React.FC<LoginProps> = () => { 
    return (
        <div>
            <Header />
            <main>
            <Login/> 
            </main>
            <Footer />
        </div>
    );
}

export default LoginPage;

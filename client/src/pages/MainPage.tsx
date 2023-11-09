import React from "react"
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import { MainPageProps } from "../utils/types";


const LoginPage: React.FC<MainPageProps> = ({user}) => { 
    return (
        <div>
            <Header />
            <main>
                HELLO {user.username}
            </main>
            <Footer />
        </div>
    );
}

export default LoginPage;

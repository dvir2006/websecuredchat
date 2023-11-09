import React from "react"
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Register from "../components/auth/Register";
import {RegisterProps} from '../utils/types';

const RegisterPage: React.FC<RegisterProps> = () => { 
    return (
        <div>
            <Header />
            <main>
            <Register  /> 
            </main>
            <Footer />
        </div>
    );
}

export default RegisterPage;

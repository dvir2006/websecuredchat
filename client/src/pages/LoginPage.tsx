import React from "react";
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Login from "../components/auth/Login";
import { LoginProps } from "../utils/types";
import { styled } from "@mui/system";

const LoginPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const LoginContainer = styled("main")({
  width: 400, 
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#f0f0f0", 
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", 
});

const LoginPage: React.FC<LoginProps> = () => {
  return (
    <LoginPageContainer>
      <Header />
      <LoginContainer>
        <Login />
      </LoginContainer>
      <Footer />
    </LoginPageContainer>
  );
};

export default LoginPage;

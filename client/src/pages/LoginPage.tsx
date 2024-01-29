import React from "react";
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Login from "../components/auth/Login";
import { LoginProps } from "../utils/types";
import { styled } from "@mui/system";

const LoginPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const ContentContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const LoginContainer = styled("main")({
  width: "100%",
  maxWidth: 400,
  borderRadius: "10px",
  backgroundColor: "#f0f0f0",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const LoginPage: React.FC<LoginProps> = () => {
  return (
    <LoginPageContainer>
      <Header />
      <ContentContainer>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </ContentContainer>
      <Footer />
    </LoginPageContainer>
  );
};

export default LoginPage;

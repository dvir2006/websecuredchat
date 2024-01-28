import React from "react";
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Register from "../components/auth/Register";
import { RegisterProps } from "../utils/types";
import { styled } from "@mui/system";

const RegisterPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const RegisterContainer = styled("main")({
  width: 400, 
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#f0f0f0", 
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", 
});

const RegisterPage: React.FC<RegisterProps> = () => {
  return (
    <RegisterPageContainer>
      <Header />
      <RegisterContainer>
        <Register />
      </RegisterContainer>
      <Footer />
    </RegisterPageContainer>
  );
};

export default RegisterPage;

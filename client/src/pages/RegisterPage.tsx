import React from "react";
import Header from "../components/const/Header";
import Footer from "../components/const/Footer";
import Register from "../components/auth/Register";
import { RegisterProps } from "../utils/types";
import { Box, styled } from "@mui/system";

const RegisterPage: React.FC<RegisterProps> = () => {
  return (
    <Box sx = {{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position:"fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    bgcolor: "background.default"}}>
      <Header />
      <Box sx = {{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      position: "relative",
      }}>
        <Box sx = {{
        width: "100%",
        maxWidth: 400,
        borderRadius: "10px",
        boxShadow: "0px 5px 3px rgba(0, 0, 0, 0.1)",
        }}>
          <Register />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default RegisterPage;

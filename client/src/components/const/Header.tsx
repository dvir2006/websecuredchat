import React from "react";
import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <header>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          bgcolor: "#f8f9fa",
          color: "#343a40",
          padding: "10px 0",
          textAlign: "center",
          zIndex: 1000,
          marginBottom: ".5%",
          borderBottom: "1px solid #ced4da",
        }}
      >
        <Typography variant="h4">Seqchat</Typography>
      </Box>
    </header>
  );
};

export default Header;

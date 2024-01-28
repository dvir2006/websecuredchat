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
          bgcolor: "#fff",
          color: "#000",
          padding: "10px 0",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <Typography variant="h4">TODO: Add Name</Typography>
      </Box>
    </header>
  );
};

export default Header;

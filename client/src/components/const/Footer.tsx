import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          bgcolor: "#fff",
          color: "#000",
          padding: "10px 0",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <Typography variant="h6">Sigma</Typography>
      </Box>
    </footer>
  );
};

export default Footer;

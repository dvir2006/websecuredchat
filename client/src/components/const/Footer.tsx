import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          bgcolor: theme.palette.mode === 'light'? "#f8f9fa":"#000000", 
          color: "#343a40", 
          padding: "20px 0", 
          textAlign: "center",
          borderTop: "1px solid #ced4da", 
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sigma
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>

      </Box>
    </footer>
  );
};

export default Footer;

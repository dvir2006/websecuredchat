import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          bgcolor: "#f8f9fa", 
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
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>

      </Box>
    </footer>
  );
};

export default Footer;

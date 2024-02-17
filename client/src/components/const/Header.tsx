import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext } from "../../App";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Header: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <header>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          bgcolor: theme.palette.mode === 'light'? "#f8f9fa":"#000000",
          color: "#343a40",
          padding: "10px 0",
          textAlign: "center",
          zIndex: 1000,
          marginBottom: ".5%",
          borderBottom: "1px solid #ced4da",
        }}
      >
        <Typography variant="h4">Seqchat</Typography>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </Box>
    </header>
  );
};

export default Header;

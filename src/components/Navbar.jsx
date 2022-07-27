import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Color theme
const theme = createTheme({
  palette: {
    primary: { main: "#212121" },
    secondary: { main: "#2196f3" },
  },
});

export default function Navbar({ totalItems }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="primary"
          core="inherit"
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              sx={{
                fontWeight: "600",
                flexGrow: 1,
                alignItems: "center",
                display: "flex",
                textDecoration: "none",
              }}
            >
              MyStore
            </Typography>
            <div
              sx={{
                flexGrow: 1,
              }}
            />
            <div className="button">
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

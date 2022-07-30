import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useLocation } from 'react-router-dom'

// Color theme
const theme = createTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#2196f3' },
  },
})

const Navbar = ({ totalItems }) => {
  const location = useLocation()

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="primary"
          core="inherit"
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              component={Link}
              to="/"
              variant="h6"
              color="inherit"
              sx={{
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              MyStore
            </Typography>
            <div
              sx={{
                flexGrow: 1,
              }}
            />
            {location.pathname === '/' && (
              <div className="button">
                <IconButton
                  component={Link}
                  to="/Cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  )
}

export default Navbar

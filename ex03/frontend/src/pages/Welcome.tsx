import { NavLink } from "react-router-dom";
import { Box, Button, Typography, Stack } from "@mui/material";

export default function Welcome() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Titre en haut */}
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold">
          Welcome to Expense Sharing App
        </Typography>
        <Typography variant="h5" color="text.secondary" mt={2}>
          Track your expenses easily!
        </Typography>
      </Box>

      {/* Boutons centrés verticalement */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack direction="row" spacing={4}>
          <Button
            component={NavLink}
            to="/add"
            variant="contained"
            sx={{
              width: 200,
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            Add an Expense
          </Button>
          <Button
            component={NavLink}
            to="/list"
            variant="contained"
            sx={{
              width: 200,
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            View Expense List
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

"use client";

import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { TextField, Button } from '@mui/material';
import { SocketConnection } from "../connection";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  var socket = useRef<WebSocket>(SocketConnection());
  var [authenticated, checkAuth] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("user"),
      hostip: data.get("host"),
      password: data.get("password")
    })
    console.log(socket);
    socket.current.send(JSON.stringify({
      login: true,
      username: data.get("user"),
      hostip: data.get("host"),
      password: data.get("password")
    }));
    socket.current.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      console.log(data);
      if (data.authenticated) {
        checkAuth(true);
      }
    };
  };
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push("/termux");
    }
  }, [authenticated]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ padding: '7px', backgroundColor: 'lightblue' }}>SSH Credentials</h3>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="User name"
                  name="user"
                  autoComplete="user"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="host"
                  label="Host IP"
                  id="host"
                  autoComplete="hostip"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ padding: '7px', backgroundColor: 'lightblue' }}>History</h3>
              {/* <Deposits /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
};
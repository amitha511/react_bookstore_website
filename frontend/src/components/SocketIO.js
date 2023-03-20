import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import BoxData from './BoxData';

function SocketIO() {
const [userCount, setUserCount] = useState(0);
const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});
  useEffect(() => {
    const socket = io();
    // Socket.IO event listener for userCount updates
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    return () => {
      socket.disconnect();
    };

  },[]);


  return (
    <div>
      <BoxData data = {userCount} title = {"Number of users online:"} more1={"Total online users in real time"}></BoxData>
    </div>
  );
}

export default SocketIO;

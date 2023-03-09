import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const SocketIO = () => {
  const [numClients, setNumClients] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on("users", (count) => {
      setNumClients(count);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Number of connected clients: {numClients}</p>
    </div>
  );
};

export default SocketIO;
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

var socket = null;

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const url = searchParams.get('url');
  console.log("url=" + url);
  if(url == null || url == "") {
    url = "10.1.1.34:8288";
  }

  useEffect(() => {
    console.log("constructor...");
    socket = new WebSocket('ws://'+url);;
    // Connection opened
    socket.addEventListener("open", handleOpen);
    // Listen for messages
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      console.log("desconstructor...");
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      if(socket.readyState == WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  function handleOpen(event: Event) {
    socket.send("Hello Server!");
  }

  function handleMessage(event:MessageEvent) {
    console.log("Message from server ", event.data);
   setMessage(event.data);
  }

  function handleClose (event: Event) {
    console.log("disconnect ", event);
  }

  function handleError(event: Event) {
    console.log("error ", event);
  }

 var [message, setMessage] = useState("");

  function sendMessage() {
    socket.send("message from client, " + new Date().toString());
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
        <br/>protocol={window.location.protocol}
        <br/>host={window.location.host}
        <br/>pathname={window.location.pathname}
        <br/>params={window.location.search}
        </p>
        <p>message: {message}</p>
        <button onClick={sendMessage}>send message to server</button>
      </header>
    </div>
  );
}

export default App;

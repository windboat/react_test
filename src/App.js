import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

var port;// type === 'undefined'

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  var url = searchParams.get('url');
  console.log("url=" + url);
  if(url == null || url == "") {
    url = "10.1.1.34:8288";
  }

  useEffect(() => {
    console.log("constructor...");

    window.addEventListener("message", handleMessage);

    return () => {
      console.log("desconstructor...");
      window.removeEventListener("message", handleMessage);
    };
  }, []);


  function handleMessage(event) {
      // We are receiveing messages from any origin, you can check of the origin by
      // using event.origin
    
      console.log("event.origin=" + event.origin);
      console.log("event port size=" + event.ports.length);
      // get the port then use it for communication;
      port = event.ports[0];
      console.log("port=" + port);
      setStatus("event.origin=" + event.origin 
      + ", event port size=" + event.ports.length 
      + ", port=" + port);
      if (typeof port === 'undefined') return;
    
      // Post message on this port.
      port.postMessage("Test message from web");
    
      // Receive upcoming messages on this port.
      port.onmessage = function(event) {
        console.log("[PostMessage1] Got message" + event.data);
        setMessage(event.data);
        port.postMessage("ACK");
      };
  }

 var [message, setMessage] = useState("");
 var [status, setStatus] = useState("");

  function sendMessage() {
    console.log("sendMessage: typeof port=" + (typeof port));
    if (typeof port === 'undefined') {
      console.log("port is undefined, cannot send message");
      alert("port is undefined, cannot send message, " + port);
      return;
    }
    port.postMessage("message from client, " + new Date().toString());
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
        <p>status: {status}</p>
        <p>message: {message}</p>
        <button onClick={sendMessage}>send message to server</button>
      </header>
    </div>
  );
}

export default App;

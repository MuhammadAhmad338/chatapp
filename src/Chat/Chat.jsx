import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import './Chat.css';

let socket;

const Chat = () => {

  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState("");
  const ENDPOINT = 'localhost:8080';
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    setname(name);
    setroom(room);
    socket.emit('join', {name, room}, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
      socket.on('message', (message) => {
        setmessages([...messages, message]);
      })     
  }, [messages]);

  const sendMessage = () => {
    console.log("Message has been sent!");
  }

  return (
    <div className='outerContainer'>
       <div className='container'>
          <input type="text" 
          value={message} 
          placeholder='Enter your message' 
          onChange={(e) => setmessage(e.target.value)}
          onKeyDown={(event) => event.key === "Enter" ? sendMessage()}
          />
       </div>
    </div>
  );
}

export default Chat;
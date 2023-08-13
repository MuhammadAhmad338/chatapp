import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {  useLocation } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
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
    socket.emit('join', { name, room }, () => { });

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setmessages([...messages, message]);
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setmessage(""));
    }
  }

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar />
        <Input message={message} setmessage={setmessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
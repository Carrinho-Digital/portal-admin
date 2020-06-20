import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import CookieUtil from '../../util/cookie';

const API_ENDPOINT = process.env.REACT_APP_WEB_SOCKET_URL;

const socket = socketIOClient(API_ENDPOINT, {
  query: {
    authorization: CookieUtil.get(),
  },
})

export function useSocketListener(listen = null) {
  const [receivedEvent, setReceivedEvent] = useState(null);

  if (!listen) {
    throw new Error('Cannot listen a topic by socket connection');
  }

  function handleSocketListener(receivedData) {
    setReceivedEvent(receivedData)
  }
  
  useEffect(() => {  
    socket.on(listen, handleSocketListener);

    return () => {
      socket.removeListener(listen);
    }
  }, [listen]);

  return receivedEvent;
}


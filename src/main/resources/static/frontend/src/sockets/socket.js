import React,{useEffect, useState} from 'react'
import {ChatContext} from '../context/ChatContext' 

export default function Socket() {
    const [isPaused, setPause] = useState(false);
    const [ws, setWs] = useState(null);
  
    useEffect(() => {
      const wsClient = new WebSocket('ws://localhost:8080/tradeHubSocket');
      wsClient.onopen = () => {
        console.log('ws opened');
        setWs(wsClient);
      };
      wsClient.onclose = () => console.log('ws closed');
  
      return () => {
        wsClient.close();
      }
    }, []);
  
    useEffect(() => {
      if (!ws) return;
  
      ws.onmessage = e => {
        if (isPaused) return;
        const message = JSON.parse(e.data);
        console.log('e', message);
      };
    }, [isPaused, ws]);
  
    return (
      <div>
       
      </div>
    )
  }

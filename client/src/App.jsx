

import { useEffect, useState } from "react";
import socket from "./services/socket";


App = ()=>  {
  
  const [metric, setMetric] = useState(null);

  useEffect(()=> {

    socket.on('newMetric', (newMetric)=> {
      console.log('New metric received:', newMetric);

      setMetric(newMetric);
      
    });

    return()=> {
      socket.off('newMetric');
    };
    
  },[]);
}
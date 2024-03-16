import React, { useState, useEffect } from 'react'

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
   <>
   <p>{currentTime.toLocaleTimeString()}</p>
   </>
  )
}

export default Time
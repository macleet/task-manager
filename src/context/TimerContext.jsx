import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [paused, setPaused] = useState(true);
    return (
        <TimerContext.Provider value={{ paused, setPaused }}>
            {children}
        </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};

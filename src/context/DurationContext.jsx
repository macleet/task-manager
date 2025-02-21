import React, { createContext, useState, useContext } from 'react';

const DurationContext = createContext();

export const DurationProvider = ({ children }) => {
    const [activeTime, setActiveTime] = useState("");
    const [restedTime, setRestedTime] = useState("");
    return (
      <DurationContext.Provider value={{ activeTime, setActiveTime, restedTime, setRestedTime }}>
          {children}
      </DurationContext.Provider>
  );
};

export const useDurationContext = () => {
  const context = useContext(DurationContext);
  if (!context) {
    throw new Error('useItemContext must be used within an DurationProvider');
  }
  return context;
};

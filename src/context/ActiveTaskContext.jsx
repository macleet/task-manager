import React, { createContext, useState, useContext } from 'react';

const ActiveTaskContext = createContext();

export const ActiveTaskProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState(-1);
    return (
        <ActiveTaskContext.Provider value={{ isActive, setIsActive, activeTaskId, setActiveTaskId }}>
            {children}
        </ActiveTaskContext.Provider>
  );
};

export const useActiveTaskContext = () => {
  const context = useContext(ActiveTaskContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};

import React, { createContext, useState, useContext, useCallback } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [isFanOn, setIsFanOn] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isACOn, setIsACOn] = useState(false);

  const toggleFan = useCallback(() => setIsFanOn(prev => !prev), []);
  const toggleLight = useCallback(() => setIsLightOn(prev => !prev), []);
  const toggleAC = useCallback(() => setIsACOn(prev => !prev), []);

  return (
    <DeviceContext.Provider value={{
      isFanOn, toggleFan,
      isLightOn, toggleLight,
      isACOn, toggleAC
    }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};

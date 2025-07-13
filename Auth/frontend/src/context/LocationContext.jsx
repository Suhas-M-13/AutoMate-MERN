import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const fetchUserLocation = useCallback(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // if(position.coords.latitude !== 12.3133 && position.coords.longitude !== 76.6134){
            setLocation({
            lat: 12.3133,
            lng: 76.6134,
          });
          // }
          // setLocation({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
          // toast.success('Location fetched successfully');
          setIsLocating(false);
        },
        (error) => {
          // toast.error('Unable to fetch location');
          setIsLocating(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
      setIsLocating(false);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation, fetchUserLocation, isLocating }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext); 
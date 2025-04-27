import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const ShopMap = ({ shopLocation, shopName, userLocation }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: shopLocation?.coordinates[1] || 0,
    lng: shopLocation?.coordinates[0] || 0,
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (userLocation && shopLocation) {
      const dist = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        shopLocation.coordinates[1],
        shopLocation.coordinates[0]
      );
      setDistance(dist);
    }
  }, [userLocation, shopLocation]);

  const getDirections = () => {
    if (!userLocation || !shopLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: userLocation.lat, lng: userLocation.lng },
        destination: { lat: shopLocation.coordinates[1], lng: shopLocation.coordinates[0] },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          setShowDirections(true);
        }
      }
    );
  };

  return (
    <div className="relative">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onLoad={map => setMap(map)}
        >
          {shopLocation && (
            <Marker
              position={{
                lat: shopLocation.coordinates[1],
                lng: shopLocation.coordinates[0],
              }}
            >
              <InfoWindow>
                <div>
                  <h3 className="font-bold">{shopName}</h3>
                  {distance && (
                    <p className="text-sm">Distance: {distance} km</p>
                  )}
                </div>
              </InfoWindow>
            </Marker>
          )}
          {showDirections && directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </LoadScript>
      
      <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        {distance && (
          <p className="text-lg font-semibold mb-2">
            Distance: {distance} km
          </p>
        )}
        <button
          onClick={getDirections}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default ShopMap; 
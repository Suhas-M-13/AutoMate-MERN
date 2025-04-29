import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useAuthStore } from "../store/authStore";

function ShopMap({ shopDetail, userLoc }) {
  // const { fetchMapRoute, mapDetail } = useAuthStore()
  const [routeCoords, setRouteCoords] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
  });



  const fetchRoute = async () => {
    try {
      const res = await axios.post("http://localhost:1972/api/consumer/get-route", {
        user: { lat: userLoc.lat, lon: userLoc.lng },
        shop: {
          lat: shopDetail.location.coordinates[1],
          lon: shopDetail.location.coordinates[0]
        }
      });
      const coords = res.data.routeCoords.map(([lon, lat]) => [lat, lon]);
      setRouteCoords(coords);
      setSelectedShop({
        id: shopDetail._id,
        name: shopDetail.shopname,
        lat: shopDetail.location.coordinates[1],
        lon: shopDetail.location.coordinates[0],
        distance: res.data.distance ? (res.data.distance / 1000).toFixed(2) : 'N/A',
        duration: res.data.duration ? (res.data.duration / 60).toFixed(2) : 'N/A'
      });
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };


  const handleNavigate = () => {
    if (selectedShop && userLoc) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLoc.lat},${userLoc.lng}&destination=${selectedShop.lat},${selectedShop.lon}&travelmode=driving`;
      window.open(url, "_blank");
    }
  };

  if (!userLoc) return <div>Loading your location...</div>;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: "400px", width: "800px", transition: "0.3s", position: "relative" }}>
        <MapContainer
          center={[userLoc.lat, userLoc.lng]}
          zoom={20}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[userLoc.lat, userLoc.lng]}>
            <Popup>Your Location</Popup>
          </Marker>

          {shopDetail && (
            <Marker key={shopDetail._id} position={[shopDetail.location.coordinates[1], shopDetail.location.coordinates[0]]} icon={redIcon}>
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {shopDetail.shopname}
                  </h3>
                  {selectedShop?.id === shopDetail._id && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {selectedShop.distance} km
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {selectedShop.duration} min
                        </span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => fetchRoute()}
                    className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Show Route
                  </button>
                </div>
              </Popup>
            </Marker>
          )}

          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="blue" />
          )}
        </MapContainer>

        {/* Navigate Button - Now positioned relative to the map container */}
        {selectedShop && (
          <button
            onClick={handleNavigate}
            className="absolute bottom-5 right-5 z-[1000] flex items-center px-4 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Navigate
          </button>
        )}
      </div>
    </div>
  );
}

export default ShopMap;

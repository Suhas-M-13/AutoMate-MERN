import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const Map = () => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const [accuracy, setAccuracy] = useState(0);
  const [showLocation, setShowLocation] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [distance, setDistance] = useState([]);

  const navigate = useNavigate();

  const handleCloseMap = () => {
    setOpen(!open);
    if (showLocation.length > 0) setShowLocation({});
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setAccuracy(accuracy);
          setShowLocation([latitude, longitude]);

          try {
            const response = await axios.get("http://localhost:1969/user");
            if (response.data.success) {
              const shopArray = response.data.data;
              setAllShops(shopArray);

              const disArray = shopArray.map((val) => ({
                shopname: val.shopname,
                shopdistance: calculateDistance(
                  latitude,
                  longitude,
                  val.latitude,
                  val.longitude
                ),
              }));

              setDistance(disArray);
            } else {
              console.error("Error fetching shop data");
            }
          } catch (error) {
            console.error("Error fetching shops:", error);
          }

          handleCloseMap();
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch location. Please enable GPS and try again.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const handleHome = () => navigate("/");

  const customCircle = {
    path: "M 0, -10 A 10 10 0 1 0 0, 10 A 10 10 0 1 0 0, -10",
    scale: 1.5,
    fillColor: "#0000FF",
    fillOpacity: 0.5,
  };

  return (
    <>
      {showLocation.length > 0 && (
        <div className="relative flex items-center justify-center">
          <h3>Longitude: {showLocation[0]}</h3>
          <h3>&nbsp;- Latitude: {showLocation[1]}</h3>
          {accuracy && <h4>Accuracy: {accuracy} meters</h4>}
        </div>
      )}
      <div className="relative flex items-center justify-center mt-[5%]">
        <button
          className="bg-slate-700 border-slate-700 border-2 text-white cursor-pointer font-semibold p-[10px] mr-[20px] hover:bg-slate-900 hover:border-slate-900 hover:transition-colors hover:duration-1s hover:ease-out hover:transform hover:p-4"
          onClick={handleLocation}
        >
          Access Current Location
        </button>
        <button
          className="bg-red-500 text-white border-none cursor-pointer font-semibold p-[10px]"
          onClick={handleHome}
        >
          Home
        </button>

        {open && (
          <div className="absolute top-0 left-5 z-1 shadow-xl w-[800px] h-[500px] p-[10px]">
            <button
              className="bg-red-500 text-white border-none cursor-pointer font-semibold p-[10px] m-[20px]"
              onClick={handleCloseMap}
            >
              Close Map
            </button>

            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={coords}
                zoom={10}
              >
                <Marker position={coords} label="Source" icon={customCircle} />
                {allShops.map((val, key) => (
                  <Marker
                    key={key}
                    position={{
                      lat: parseFloat(val.latitude),
                      lng: parseFloat(val.longitude),
                    }}
                    label={val.shopname}
                  />
                ))}
              </GoogleMap>
            )}
          </div>
        )}
        <div className="absolute right-5 flex items-center justify-center mt-[40%]"> 
        {distance.length > 0 && (
          <div>
            <h3>Distances between user location and shop location:</h3>
            <br />
            {distance.map((val, key) => (
              <p key={key}>
                Shopname: {val.shopname} - Distance: {val.shopdistance.toFixed(2)} km
              </p>
            ))}
          </div>
        )}
      </div>
      </div>

      
    </>
  );
};

export default Map;

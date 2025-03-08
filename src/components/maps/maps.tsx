import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect, useCallback } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { Circle } from "../../components/Circle/circle";
import getUserLocationAndCoordinates from "../../helpers/fetchUserCoordinates";

type Poi = { key: string; location: google.maps.LatLngLiteral };

const apiKey = import.meta.env.VITE_MAPS_API_KEY;

const MapsDisplay = () => {
  const [locations, setLocations] = useState<Poi[]>([]);

  useEffect(() => {
    const fetchAndSetLocations = async () => {
      const cachedData = localStorage.getItem("cachedUserLocations");

      if (cachedData) {
        console.log("Using cached data.");
        setLocations(JSON.parse(cachedData));
        return;
      }

      console.log("Fetching user locations...");
      const usersWithCoordinates = await getUserLocationAndCoordinates();

      if (usersWithCoordinates) {
        const formattedLocations: Poi[] = usersWithCoordinates
          .filter((user) => user.coordinates)
          .map((user, index) => ({
            key: `user-${index}`,
            location: {
              lat: user.coordinates?.lat ?? 0, // Fix: Directly access lat
              lng: user.coordinates?.lon ?? 0, // Fix: Directly access lon
            },
          }));

        setLocations(formattedLocations);
        localStorage.setItem("cachedUserLocations", JSON.stringify(formattedLocations));
      }
    };

    fetchAndSetLocations();
  }, []);

  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API Loaded.")}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -1.29206590, lng: 36.82194620 }}
        mapId="b2151adb26f0f110"
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log("Camera changed:", ev.detail.center, "Zoom:", ev.detail.zoom)
        }
      >
        <PoiMarkers pois={locations} />
      </Map>
    </APIProvider>
  );
};

const PoiMarkers = ({ pois }: { pois: Poi[] }) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<{ [key: string]: Marker }>({});
  const [circleCenter, setCircleCenter] = useState<google.maps.LatLng | null>(null);

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map || !ev.latLng) return;
      console.log("Marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
      setCircleCenter(ev.latLng);
    },
    [map]
  );

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update MarkerClusterer when pois change
  useEffect(() => {
    if (!clusterer.current) return;

    // Clear existing markers
    clusterer.current.clearMarkers();

    // Add new markers to the clusterer
    clusterer.current.addMarkers(Object.values(markersRef.current));
  }, [pois]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker) {
      markersRef.current[key] = marker;
    } else {
      delete markersRef.current[key];
    }
  };

  return (
    <>
      <Circle
        radius={800}
        center={circleCenter}
        strokeColor={"#0c4cb3"}
        strokeOpacity={1}
        strokeWeight={3}
        fillColor={"#3b82f6"}
        fillOpacity={0.3}
      />
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable={true}
          onClick={handleClick}
        >
          <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MapsDisplay;
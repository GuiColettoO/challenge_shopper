import { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { Location } from "../../contexts/estimateContext";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

export type MapViewProps = {
  location: Location;
};

export function MapView({ location }: MapViewProps) {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={{ lat: 43.65, lng: -79.38 }}
        defaultZoom={9}
        gestureHandling={"greedy"}
        fullscreenControl={false}
        streetViewControl={false}
      >
        <Directions location={location} />
      </Map>
    </APIProvider>
  );
}

function Directions({ location }: MapViewProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    console.log(location);
    directionsService
      .route({
        origin: {
          lat: location.origin.latitude,
          lng: location.origin.longitude,
        },
        destination: {
          lat: location.destination.latitude,
          lng: location.destination.longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, location]);
  console.log("MANEIRO LOCATION:", location);
  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
}

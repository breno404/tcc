import React, { useCallback, useEffect, useMemo, useState } from "react";
import "@/styles/googleMapMarker.css";
import { GoogleMap as Maps, useJsApiLoader } from "@react-google-maps/api";
import { useSpring } from "@react-spring/web";
import CarMarker from "./marker/CarMarker";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

type Position = {
  lat: number;
  lng: number;
};

const libraries: Libraries = ["places"];

const positions: Position[] = [
  { lat: -27.593066, lng: -48.549793 },
  { lat: -27.592933, lng: -48.55106 },
  { lat: -27.592864, lng: -48.55197 },
  { lat: -27.593375, lng: -48.551891 },
  { lat: -27.593758, lng: -48.551762 },
  { lat: -27.593752, lng: -48.551125 },
  { lat: -27.593749, lng: -48.550606 },
  { lat: -27.59375, lng: -48.550152 },
  { lat: -27.594069, lng: -48.550223 },
  { lat: -27.594522, lng: -48.550324 },
];

const center = {
  lat: positions[0].lat,
  lng: positions[0].lng,
};

type GoogleMapProps = { width: string; height: string };

function GoogleMap(props: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDR7nKBkrvUZHIiSbieQKAjQNXjT255rFg",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [coordinate, setCoordinate] = useState(center);

  const containerStyle = useMemo(() => {
    return { width: props.width, height: props.height };
  }, [props.width, props.height]);

  const spring = useSpring({
    val: 0,
    from: { val: 1 },
    config: { duration: 1000 },
    onChange: () => {
      const value = spring.val.get();
      if (currentPosition > 0) {
        const latDiff =
          (positions[currentPosition].lat -
            positions[currentPosition - 1].lat) *
          value;
        const lngDiff =
          (positions[currentPosition].lng -
            positions[currentPosition - 1].lng) *
          value;
        const newCoord = {
          lat: positions[currentPosition].lat - latDiff,
          lng: positions[currentPosition].lng - lngDiff,
        };
        setCoordinate(newCoord);
      }
    },
  });

  const getRotation = (cPos: Position, nPos: Position) => {
    if (!cPos || !nPos) {
      return 0;
    }

    const latDiff = cPos.lat - nPos.lat;
    const lngDiff = cPos.lng - nPos.lng;
    return (Math.atan2(lngDiff, latDiff) * 180.0) / Math.PI;
  };

  const animate = (newCurPos: number) => {
    const newRot = getRotation(
      positions[currentPosition],
      positions[newCurPos]
    );
    setCurrentRotation(newRot);
    setCurrentPosition(newCurPos);
    spring.val.reset();
    spring.val.start();
  };

  const doUpdate = () => {
    const newCurPos = currentPosition + 1;
    if (newCurPos >= positions.length) return;

    animate(newCurPos);
  };

  useEffect(() => {
    setTimeout(() => {
      doUpdate();
    }, 1000);
  }, [currentPosition]);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Maps
      mapContainerStyle={containerStyle}
      center={coordinate}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        center: coordinate,
        zoom: 17,
        minZoom: 15,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      }}
    >
      {map && (
        <CarMarker
          coordinate={coordinate}
          color={"black"}
          map={map}
          rotation={currentRotation}
        />
      )}
    </Maps>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMap);

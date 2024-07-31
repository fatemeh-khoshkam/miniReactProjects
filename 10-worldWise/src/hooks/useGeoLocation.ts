import { useState } from "react";

type Position = {
  lat: number;
  lng: number;
};

interface GeolocationHook {
  isLoading: boolean;
  position: Position | null;
  error: string | null;
  getPosition: () => void;
}

function useGeolocation(
  defaultPosition: Position | null = null,
): GeolocationHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error: GeolocationPositionError) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}

export { useGeolocation };

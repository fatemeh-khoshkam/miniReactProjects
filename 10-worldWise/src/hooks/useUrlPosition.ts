import { useSearchParams } from "react-router-dom";

type PositionTuple = [number | null, number | null];

export function useUrlPosition(): PositionTuple {
  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams.get("lat");
  const lng: string | null = searchParams.get("lng");

  // Parse the values to numbers, or return null if parsing fails
  const parsedLat: number | null = lat ? parseFloat(lat) : null;
  const parsedLng: number | null = lng ? parseFloat(lng) : null;

  // Check if the parsed values are valid numbers
  const validLat: number | null =
    parsedLat !== null && !isNaN(parsedLat) ? parsedLat : null;
  const validLng: number | null =
    parsedLng !== null && !isNaN(parsedLng) ? parsedLng : null;

  return [validLat, validLng];
}

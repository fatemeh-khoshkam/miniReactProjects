type cityDataType = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number | null;
    lng: number | null;
  };
  id?: string;
};

export default cityDataType;

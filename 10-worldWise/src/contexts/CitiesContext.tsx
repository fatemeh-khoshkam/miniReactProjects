import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cityDataType from "../types/cityDataType";

const BASE_URL = "http://localhost:9800";

type CitiesContextType = {
  isLoading: boolean;
  cities: cityDataType[];
};

const CitesContext = createContext<CitiesContextType>({
  isLoading: false,
  cities: [],
});

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<cityDataType[]>([]);

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);

      const res: Response = await fetch(`${BASE_URL}/cities`);

      const data: cityDataType[] = await res.json();
      console.log(data);
      setCities(data);
      setIsLoading(false);
    }

    fetchCities();
  }, []);

  return (
    <CitesContext.Provider
      value={{
        isLoading,
        cities,
      }}
    >
      {children}
    </CitesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  console.log(context);
  return context;
}

export { CitiesProvider, useCities };

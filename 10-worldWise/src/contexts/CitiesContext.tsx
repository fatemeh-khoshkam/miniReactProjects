import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cityDataType from "../types/cityDataType";

const BASE_URL = "http://localhost:9000";

type CitiesContextType = {
  isLoading: boolean;
  cities: cityDataType[];
  currentCity: cityDataType | null;
  getCity: (id: number) => Promise<void>;
};

const CitesContext = createContext<CitiesContextType | null>(null);

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<cityDataType[]>([]);
  const [currentCity, setCurrentCity] = useState<cityDataType | null>(null);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res: Response = await fetch(`${BASE_URL}/cities`);

        const data: cityDataType[] = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        console.error("Failed to fetch cities.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsLoading(true);
      const res: Response = await fetch(`${BASE_URL}/cities/${id}`);
      const data: cityDataType = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch {
      console.error("Failed to fetch city.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitesContext);
  if (context === undefined || context === null) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  console.log(context);
  return context;
}

export { CitiesProvider, useCities };

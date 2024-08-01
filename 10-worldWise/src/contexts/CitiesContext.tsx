import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cityDataType from "../types/cityDataType";

const BASE_URL = "http://localhost:9000";

type CitiesContextType = {
  isLoading: boolean;
  cities: cityDataType[];
  currentCity: cityDataType | null;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: cityDataType) => Promise<void>;
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

  async function getCity(id: string) {
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

  async function createCity(newCity: cityDataType) {
    try {
      const res: Response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: cityDataType = await res.json();
      console.log("New city data:", data);

      setCities((prevCities) => [...prevCities, data]);
      console.log("Updated cities:", cities);
    } catch (err) {
      console.error("Failed to create city:", err);
    }
  }

  return (
    <CitesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
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

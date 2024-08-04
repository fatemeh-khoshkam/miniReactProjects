import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import React from "react";
import cityDataType from "../types/cityDataType";
import CityDataType from "../types/cityDataType";

const BASE_URL = "http://localhost:9000";

type initialStateType = {
  isLoading: boolean;
  cities: cityDataType[];
  currentCity: cityDataType | null;
  error?: string;
};

const initialState: initialStateType = {
  isLoading: false,
  cities: [],
  currentCity: null,
  error: "",
};

enum typeOfAction {
  "loading" = "loading",
  "loaded" = "cities/loaded",
  "loadCity" = "city/loaded",
  "created" = "city/created",
  "deleted" = "city/deleted",
  "rejected" = "rejected",
}

type Action =
  | { type: typeOfAction.loading }
  | { type: typeOfAction.loaded; payload: CityDataType[] }
  | { type: typeOfAction.loadCity; payload: CityDataType }
  | { type: typeOfAction.created; payload: CityDataType }
  | { type: typeOfAction.deleted; payload: string }
  | { type: typeOfAction.rejected; payload: string };

function reducer(state: initialStateType, action: Action): initialStateType {
  switch (action.type) {
    case typeOfAction.loading:
      return { ...state, isLoading: true };
    case typeOfAction.loaded:
      return { ...state, isLoading: false, cities: action.payload };
    case typeOfAction.loadCity:
      return { ...state, isLoading: false, currentCity: action.payload };
    case typeOfAction.created:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case typeOfAction.deleted:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case typeOfAction.rejected:
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unrecognized action");
  }
}

type CitiesContextType = initialStateType & {
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: cityDataType) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
};

const CitesContext = createContext<CitiesContextType | null>(null);

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [cities, setCities] = useState<cityDataType[]>([]);
  // const [currentCity, setCurrentCity] = useState<cityDataType | null>(null);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: typeOfAction.loading });
      try {
        const res: Response = await fetch(`${BASE_URL}/cities`);
        const data: cityDataType[] = await res.json();
        //console.log(data);

        dispatch({ type: typeOfAction.loaded, payload: data });
        //setCities(data);
      } catch {
        dispatch({
          type: typeOfAction.rejected,
          payload: "Failed to fetch cities...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      console.log(id, currentCity?.id);
      if (id === currentCity?.id) return;

      dispatch({ type: typeOfAction.loading });
      try {
        const res: Response = await fetch(`${BASE_URL}/cities/${id}`);
        const data: cityDataType = await res.json();
        //console.log(data);

        dispatch({ type: typeOfAction.loadCity, payload: data });
        //setCurrentCity(data);
      } catch {
        dispatch({
          type: typeOfAction.rejected,
          payload: "Failed to fetch city....",
        });
      }
    },
    [currentCity?.id],
  );

  async function createCity(newCity: cityDataType) {
    dispatch({ type: typeOfAction.loading });
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
      dispatch({ type: typeOfAction.created, payload: data });
      //setCities((prevCities) => [...prevCities, data]);/
    } catch (err) {
      dispatch({
        type: typeOfAction.rejected,
        payload: "There was an error on creating city: ",
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: typeOfAction.loading });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: typeOfAction.deleted, payload: id });
      //setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      dispatch({
        type: typeOfAction.rejected,
        payload: "There was an error on deleting city: ",
      });
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
        deleteCity,
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
  //console.log(context);
  return context;
}

export { CitiesProvider, useCities };

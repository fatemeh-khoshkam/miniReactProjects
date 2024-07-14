import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing.tsx";
import Product from "./pages/Product.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Login from "./pages/Login.tsx";
import CityList from "./components/City/CityList.tsx";
import CountryList from "./components/Country/CountryList.tsx";
import Form from "./components/Form.tsx";
import City from "./components/City/City.tsx";
import cityDataType from "./types/cityDataType.ts";

const BASE_URL = "http://localhost:9000";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

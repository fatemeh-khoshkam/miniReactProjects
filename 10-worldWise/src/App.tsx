import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing.tsx";
import Product from "./pages/Product.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Login from "./pages/Login.tsx";
import CityList from "./components/City/CityList.tsx";
import CountryList from "./components/Country/CountryList.tsx";
import Form from "./components/Form.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import StarRating from './components/StarRating'

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/*<App />*/}
      <StarRating maxRating={5}/>
      <StarRating size={18} color={"red"} maxRating={10}/>
      <StarRating messages={['Terrible' , 'Bad' , 'Okay' , 'Good' , 'Amazing']}/>
  </React.StrictMode>
);

import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";

const BASE_URL = "http://localhost:4000";

function App() {
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res: Response = await fetch(`${BASE_URL}/questions`);
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        console.log(data);
      } catch (err) {
        if (err instanceof TypeError) {
          console.log("🌐 Please check your internet connection.");
        } else if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      {/*<DateCounter />*/}
      <Header />

      <Main>
        <p>1 / 15</p>
        <p>Questions ?</p>
      </Main>
    </div>
  );
}

export default App;

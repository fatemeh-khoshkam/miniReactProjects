import "./assets/styles/index.css";
import React from "react";
import imagePaths from "./imagePaths";

interface pizzaDataType {
    name:string,
    ingredients:string,
    price:number,
    photoName:string,
    soldOut:boolean
}
//Lists of pizza dishes
const pizzaData:pizzaDataType[] = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 16,
        photoName: "focaccia",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 18,
        photoName: "margherita",
        soldOut: true,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 13,
        photoName: "spinaci",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 25,
        photoName: "funghi",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "salamino",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "prosciutto",
        soldOut: false,
    },
];



//Header of menu
function Header(): React.JSX.Element {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
    </header>
);
}

function Menu():React.JSX.Element {
    const pizzas:pizzaDataType[] = pizzaData;
    const numPizzas:number = pizzas.length;
    return (
        <main className="menu">
            <h2>Our menu</h2>

    {/* If you have pizza in data, you can see that list , if not have any pizza on that list you able to see paragraph */}
    {numPizzas > 0 ? (
        //React Fragment
        <>
            <p>
                Authentic Italian cuisine. 6 creative dishes to choose from. All
        from our stone oven, all organic, all delicious.
    </p>

    <ul className="pizzas">
        {pizzas.map((pizza) => (
                <Pizza pizzaObj={pizza} key={pizza.name} />
    ))}
        </ul>
        </>
    ) : (
        <p>We're still working on our menu. Please come back later :)</p>
    )}
    </main>
);
}

function Pizza({ pizzaObj }: { pizzaObj: pizzaDataType }) {

    const imagePath:string = imagePaths[pizzaObj.photoName];
    const soldOut:boolean = pizzaObj.soldOut;
    //If one item of pizza sold out, that color is changed and that prices is changed and replaced with text "SOLD OUT"
    return (
        <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
    <img src={imagePath} alt={pizzaObj.name} />
    <div>
    <h3>{pizzaObj.name}</h3>
    <p>{pizzaObj.ingredients}</p>
    <span>{soldOut ? "SOLD OUT" : pizzaObj.price}</span>
    </div>
    </li>
);
}

function Footer():React.JSX.Element {
    const hour:number = new Date().getHours();
    const openHour:number = 12;
    const closeHour:number = 22;
    const isOpen:boolean = hour >= openHour && hour <= closeHour;

    //OPEN restaurant between 12 until 22
    return (
        <footer className="footer">
            {isOpen ? (
                    <Order closeHour={closeHour} openHour={openHour} />
) : (
        <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00.
    </p>
)}
    </footer>
);
}

// If you want to see order button, you just go between 12 and 22 hour
function Order({ closeHour, openHour } : {closeHour:number , openHour:number }):React.JSX.Element {
    return (
        <div className="order">
            <p>
                We're open from {openHour}:00 until {closeHour}:00. Come visit us or
    order online.
    </p>
    <button className="btn">Order</button>
        </div>
);
}

//Main component
function App():React.JSX.Element {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

export default App;
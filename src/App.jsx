import React, { useState } from "react";
import PLANTS from "./data.js";
import PlantsButton from "./PlantsButton.jsx";
import "./index.css";

export default function App() {
  // console.log("getting started");
  const [cartNames, setCartNames] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const addToCart = (plantName) => {
    const index = cartNames.indexOf(plantName);
    if (index !== -1) {
      setQuantities(quantities.map((qty, i) => (i === index ? qty + 1 : qty)));
    } else {
      setCartNames([...cartNames, plantName]);
      setQuantities([...quantities, 1]);
    }
  };

  const updateQuantity = (plantName, amount) => {
    const index = cartNames.indexOf(plantName);
    if (index === -1) return;
    const newQty = quantities[index] + amount;
    if (newQty <= 0) {
      setCartNames(cartNames.filter((_, i) => i !== index));
      setQuantities(quantities.filter((_, i) => i !== index));
    } else {
      setQuantities(
        quantities.map((qty, i) => (i === index ? qty + amount : qty))
      );
    }
  };

  return (
    <>
      <header>
        <h1>Proper Plants</h1>
        <h2>Plants</h2>
      </header>
      <main className="layout">
        <section className="plants-selection">
          <p>Choose Your Plants</p>
          <div></div>
          <PlantsButton plants={PLANTS} addToCart={addToCart} />
        </section>
        <div className="cart">
          <h2>Cart</h2>
          {cartNames.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartNames.map((name, index) => {
              const plant = PLANTS.find((p) => p.name === name);
              return (
                <div className="cart-item" key={name}>
                  <section>
                    {plant.image} {name}
                  </section>
                  <div className="cart-controls">
                    <button onClick={() => updateQuantity(name, -1)}>-</button>
                    <section>{quantities[index]}</section>
                    <button onClick={() => updateQuantity(name, 1)}>+</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}

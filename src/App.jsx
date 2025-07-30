import React, { useState } from "react";
import PLANTS from "./data.js";
import PlantsButton from "./PlantsButton.jsx";
import "./index.css";

export default function App() {
  // console.log("getting started");
  const cart = useState([]);
  const cartItems = cart[0];
  const setCartItems = cart[1];

  const addToCart = (plant) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === plant.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...plant, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (plantId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === plantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  return (
    <>
      <header>
        <h1>Proper Plants</h1>
        <h2>Plants</h2>
      </header>
      <main className="layout">
        <section className="plants-grid">
          <p>Choose Your Plants</p>
          <div></div>
          <PlantsButton plants={PLANTS} addToCart={addToCart} />
        </section>
        <aside className="cart">
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>
                  {item.image} {item.name}
                </span>
                <div className="cart-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </aside>
      </main>
    </>
  );
}

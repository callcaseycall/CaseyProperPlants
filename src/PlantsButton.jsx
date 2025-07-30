import PLANTS from "./data.js";

export default function PlantsButton({ plants, addToCart }) {
  //   console.log("we are in the plants button");
  return (
    <div className="plants">
      {plants.map((plant) => (
        <div className="plant-card" key={plant.id}>
          <div className="plant-image">{plant.image}</div>
          <div className="plant-name">{plant.name}</div>
          <button onClick={() => addToCart(plant)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

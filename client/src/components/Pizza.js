import React, { useState, useEffect } from "react";

function Pizza() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5555/pizzas");
        if (!response.ok) {
          throw new Error("Failed to fetch pizzas");
        }

        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Pizzas</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h2>{pizza.name}</h2>
            <p>Ingredients: {pizza.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pizza;

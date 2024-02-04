import React, { useState, useEffect } from "react";

function RestaurantPizza() {
  const [pizzas, setPizzas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [newPizza, setNewPizza] = useState({
    pizza_id: "",
    restaurant_id: "",
    price: 0,
  });

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/pizzas");
        if (!response.ok) {
          throw new Error("Failed to fetch pizzas");
        }

        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchPizzas();
    fetchRestaurants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPizza({
      ...newPizza,
      [name]: name === "price" ? parseInt(value, 10) : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5555/restaurant_pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPizza),
      });

      if (!response.ok) {
        throw new Error("Failed to create new pizza");
      }

      // Fetch pizzas again after creating a new one
      // This is optional, you might want to update the UI differently
      // after creating a new pizza
      setNewPizza({
        pizza_id: "",
        restaurant_id: "",
        price: 0,
      });
    } catch (error) {
      console.error("Error creating new pizza:", error);
    }
  };

  return (
    <div>
      <h1>Restaurant Pizzas</h1>
      <ul>
        {/* Display existing pizzas */}
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h2>{pizza.name}</h2>
            <p>Ingredients: {pizza.ingredients}</p>
          </li>
        ))}
      </ul>

      <h2>Create New Pizza</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Pizza:
          <select
            name="pizza_id"
            value={newPizza.pizza_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Pizza
            </option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                {pizza.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Restaurant:
          <select
            name="restaurant_id"
            value={newPizza.restaurant_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Restaurant
            </option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Price:
          <input
  type="number"
  name="price"
  value={newPizza.price || ""}
  onChange={handleInputChange}
/>
        </label>
        <br />
        <button type="submit">Create Pizza</button>
      </form>
    </div>
  );
}

export default RestaurantPizza;

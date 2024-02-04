import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams();
  const history = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5555/restaurants/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch restaurant details for ID ${id}`);
        }

        const data = await response.json();
        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  function handleDelete() {
    try {
      fetch(`http://127.0.0.1:5555/restaurants/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete restaurant with ID ${id}`);
          }

          // Optionally, you can redirect the user after successful deletion
          history("/restaurants");

          console.log(`Restaurant with ID ${id} deleted successfully`);
        })
        .catch((error) => {
          console.error("Error deleting restaurant:", error);
        });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  }

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{restaurantData.name}</h1>
      <p>Address: {restaurantData.address}</p>
      <h3>Pizzas:</h3>
      <ul>
        {restaurantData.pizzas.map((pizza) => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong>
            <p>Ingredients: {pizza.ingredients}</p>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Restaurant
      </button>
    </div>
  );
}

export default RestaurantDetails;

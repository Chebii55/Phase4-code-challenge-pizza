import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import RestaurantDetails from "./RestaurantDetails";

function Restaurants() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/restaurants")
      .then((response) => response.json()) 
      .then((data) => {
        setData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleDetails( restaurantId) {
  
    console.log(`Clicked on restaurant with ID: ${restaurantId}`);
    <RestaurantDetails id={restaurantId} key={restaurantId}/>
  }

  return (
    <div className="Restaurants">
      <h1>Restaurants</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.address}</td>
              <td>
                <Link to={`/restaurants/${restaurant.id}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleDetails(restaurant.id)}
                  >
                    Details
                  </button>
                </Link>
              </td>
              <td>
                {/* 
                <button type="button" className="btn btn-danger" onClick={() => console.log(`Deleting restaurant with ID: ${restaurant.id}`)}>
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Restaurants;

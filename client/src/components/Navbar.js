import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div
      style={{
        borderBottom: "2px solid black",
        paddingBottom: "10px",
        marginBottom: "12px",
      }}
    >
      <NavLink style={{ marginRight: "10px" }} to="/">
        <h1>Home</h1>
      </NavLink>
      <NavLink style={{ marginRight: "10px" }} to="/restaurants">
        Restaurants
      </NavLink>
      <NavLink style={{ marginRight: "10px" }} to="/restaurant-pizza">
        RestaurantPizza
      </NavLink>
      <NavLink style={{ marginRight: "10px" }} to="/pizzas">
        Pizza
      </NavLink>
    </div>
  );
}

export default NavBar;
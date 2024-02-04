import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from './Restaurants';
import RestaurantPizza from "./RestaurantPizza";
import NavBar from "./Navbar";
import RestaurantDetails from "./RestaurantDetails";
import Pizza from "./Pizza";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/pizzas" element={<Pizza/>} />
          <Route path="/restaurant-pizza" element={<RestaurantPizza />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/" element={<h1>Welcome to our Restaurants HomePage</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

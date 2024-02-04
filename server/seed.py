#!/usr/bin/env python3

from faker import Faker
import random
from app import app
from models import db, Restaurant,Pizza,RestaurantPizza

fake = Faker()

def make_restaurants():
    Restaurant.query.delete()

    restaurants_data = [
        {"name": "Flavor Haven", "address": "123 Main Street, Cityville, State 12345"},
        {"name": "Urban Bites", "address": "456 Elm Street, Townsville, State 56789"},
        {"name": "Sizzling Saffron", "address": "789 Oak Avenue, Villagetown, State 98765"},
        {"name": "Coastal Cravings", "address": "234 Pine Road, Hamletville, State 43210"},
        {"name": "Fusion Feast", "address": "567 Maple Lane, Suburbia, State 87654"},
        {"name": "Spice Symphony", "address": "890 Cedar Drive, Boroughburg, State 10987"},
        {"name": "Savory Seasons", "address": "345 Birch Court, Township, State 65432"},
        {"name": "Gourmet Grove", "address": "678 Walnut Street, Districtville, State 21098"},
        {"name": "Fire & Fork", "address": "901 Spruce Avenue, Metropolis, State 87654"},
        {"name": "Zestful Zucchini", "address": "123 Pineapple Plaza, Cityburg, State 54321"}
    ]

    restaurants = [Restaurant(name=data["name"], address=data["address"]) for data in restaurants_data]

    db.session.add_all(restaurants)
    db.session.commit()

def make_pizzas():
    Pizza.query.delete()

    pizzas_data = [
        {"name": "Margherita", "ingredients": "Tomato, Mozzarella, Basil"},
        {"name": "Pepperoni", "ingredients": "Pepperoni, Tomato Sauce, Mozzarella"},
        {"name": "Vegetarian", "ingredients": "Mushrooms, Bell Peppers, Onions, Tomato Sauce, Mozzarella"},
        {"name": "Hawaiian", "ingredients": "Ham, Pineapple, Tomato Sauce, Mozzarella"},
        {"name": "Meat Lovers", "ingredients": "Sausage, Bacon, Pepperoni, Tomato Sauce, Mozzarella"},
        {"name": "BBQ Chicken", "ingredients": "Grilled Chicken, BBQ Sauce, Red Onions, Mozzarella"},
        {"name": "Mushroom Truffle", "ingredients": "Mushrooms, Truffle Oil, Mozzarella, Parmesan"},
        {"name": "Pesto Delight", "ingredients": "Pesto Sauce, Cherry Tomatoes, Mozzarella, Pine Nuts"},
        {"name": "Buffalo Chicken", "ingredients": "Buffalo Sauce, Grilled Chicken, Ranch Dressing, Mozzarella"},
        {"name": "Four Cheese", "ingredients": "Mozzarella, Cheddar, Gouda, Parmesan"},
    ]

    pizzas = [Pizza(name=data["name"], ingredients=data["ingredients"]) for data in pizzas_data]
    db.session.add_all(pizzas)
    db.session.commit()


def make_restaurantpizzas():
    RestaurantPizza.query.delete()

    restaurantpizzas = []
    for _ in range(30):  
        price = random.randint(10, 30)  
        pizza_id = random.randint(1, 10) 
        restaurant_id = random.randint(1, 5) 

        restaurantpizza = RestaurantPizza(price=price, pizza_id=pizza_id, restaurant_id=restaurant_id)
        restaurantpizzas.append(restaurantpizza)

    db.session.add_all(restaurantpizzas)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        try:
            make_restaurants()
            make_pizzas()
            make_restaurantpizzas()
        except Exception as e:
            print(f"An error occurred: {e}")

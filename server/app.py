#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS



from models import db, Restaurant, RestaurantPizza, Pizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api=Api(app)

@app.route('/')
def home():
    return '<h1>Pizza Code Challenge</h1>'

class Restaurants(Resource):
    def get(self):
        all_res=Restaurant.query.all()
        restaurants=[restaurant.to_dict() for restaurant in  all_res]
        return make_response(jsonify(restaurants),200)
    
    # def post(self):
    #     data=request.get_json()

    #     new_restaurant=Restaurant(
    #         name=data['name'],
    #         address=data['address']
    #     )
    #     db.session.add(new_restaurant)
    #     db.session.commit()

    #     return make_response(jsonify(new_restaurant.to_dict()), 201)


api.add_resource(Restaurants, '/restaurants')

class RestaurantsByID(Resource):
    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            resp = {"error": "Restaurant not found"}
            return resp

        # Serialize the restaurant including pizzas
        restaurant_dict = restaurant.to_dict(include_pizzas=True)

        return make_response(jsonify(restaurant_dict), 200)

    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            resp = {"error": "Restaurant not found"}
            return resp

        try:
            db.session.delete(restaurant)
            db.session.commit()
            return make_response('Deleted restaurant successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting restaurant', 500)



api.add_resource(RestaurantsByID, '/restaurants/<int:id>')

class Pizzas(Resource):
    def get(self):
        pizzas=[pizza.to_dict() for pizza in  Pizza.query.all()]
        return make_response(jsonify(pizzas),200)

    # def post(self):
    #     data=request.get_json()

    #     new_pizza=Pizza(
    #         name=data['name'],
    #         ingredients=data['ingredients']
    #     )
    #     db.session.add(new_pizza)
    #     db.session.commit()

    #     return make_response(new_pizza.to_dict(), 201)
    
api.add_resource(Pizzas, '/pizzas')

class RestaurantPizzas(Resource):
    def get(self):
        restaurantPizza=[pizzarest.to_dict() for pizzarest in  RestaurantPizza.query.all()]
        return make_response(jsonify(restaurantPizza),200)

    def post(self):
        data=request.get_json()
        try:
            new_restaurant_pizza = RestaurantPizza(
                price=data['price'],
                pizza_id=data['pizza_id'],
                restaurant_id=data['restaurant_id']
            )
            db.session.add(new_restaurant_pizza)
            db.session.commit()
            resp=Pizza.query.filter_by(id=new_restaurant_pizza.pizza_id).first()
            return make_response(jsonify(resp.to_dict()), 201)
        except ValueError as e:
            return make_response({"errors": [str(e)]}, 400)
        
    
    def delete(self,id):
        restaurant_pizza = RestaurantPizza.query.filter_by(id=id).first()
        if not restaurant_pizza:
            resp={"error": "RestaurantPizza not found"}
            return resp
        db.session.delete(restaurant_pizza)
        db.session.commit()

        return make_response('deleted restaurant successfully', 200)
api.add_resource(RestaurantPizzas, '/restaurant_pizzas')



if __name__ == '__main__':
    app.run(port=5555)

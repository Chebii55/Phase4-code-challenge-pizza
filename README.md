# Pizza Restaurant App

The Pizza Restaurant App is a full-stack web application designed to manage and showcase information about various pizza restaurants. It provides users with the ability to view details about different restaurants, explore their pizza offerings, and perform actions such as creating new pizzas and deleting entire restaurants.

Now, run with Honcho:

```console
 honcho start -f Procfile.dev
```
## Features

### 1. Restaurant Listing

- **View All Restaurants:**
  Users can see a comprehensive list of all registered pizza restaurants.

### 2. Restaurant Details

- **View Restaurant Details:**
  Users can click on a specific restaurant to view detailed information, including its address and a list of available pizzas.

### 3. Pizza Management

- **Create New Pizzas:**
  Users can add new pizzas to a restaurant, specifying the name, ingredients, and price.

### 4. Restaurant Deletion

- **Delete Restaurants:**
  Authorized users can delete a restaurant, removing it from the system along with all associated pizzas.

### 5. Responsive Design

- **Mobile and Desktop Friendly:**
  The application is designed with a responsive layout, ensuring a seamless user experience on both mobile and desktop devices.

## Technologies Used

### Frontend

- **React.js:**
  The frontend is built using React.js, providing a dynamic and efficient user interface.

- **React Router:**
  For navigation and managing routes within the React application.

- **Bootstrap:**
  Utilized for styling and creating a visually appealing user interface.

### Backend

- **Flask (Python):**
  The backend server is built with Flask, a lightweight and versatile web framework in Python.

- **SQLAlchemy:**
  For interacting with the SQLite database and managing data models.

- **SQLite Database:**
  The application uses an SQLite database to store information about restaurants and pizzas.

## Getting Started

To set up the Pizza Restaurant App on your local machine, follow the instructions in the [Getting Started](#getting-started) section of the README.md file.

## Project Structure

The project is organized into frontend and backend directories.


## API Endpoints

The application's backend provides various API endpoints, allowing seamless communication between the frontend and backend. The key endpoints include:

- **GET /restaurants:** Retrieve a list of all restaurants.
- **GET /restaurants/:id:** Get details of a specific restaurant.
- **POST /restaurant_pizzas:** Create a new pizza for a restaurant.
- **DELETE /restaurants/:id:** Delete a restaurant.

For more detailed API documentation, refer to the [API documentation](./API.md).

## Contributing

Contributions to the project are welcome! Users can open issues for bug reports or new features and submit pull requests for proposed changes.

## License

The Pizza Restaurant App is licensed under the [MIT License](LICENSE).

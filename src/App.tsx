import "./App.css";
import "./style.css";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal";
import { useState, useEffect } from "react";
import { FilterCategory, Restaurant } from "./types";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    const response = await fetch("http://localhost:3000/restaurants");
    const data = await response.json();
    setRestaurants(data);
  };

  const [category, setCategory] = useState<FilterCategory>("전체");

  const filteredRestaurants =
    category === "전체"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.category === category);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleCloseRestaurantDetailModal = () => {
    setSelectedRestaurant(null);
  };

  const handleOpenRestaurantDetailModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] =
    useState(false);

  const handleCloseAddRestaurantModal = () => {
    setIsAddRestaurantModalOpen(false);
  };

  const handleOpenAddRestaurantModal = () => {
    setIsAddRestaurantModalOpen(true);
  };

  const handleAddRestaurant = async (newRestaurant) => {
    await fetch("http://localhost:3000/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    });
    await fetchRestaurants();
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <Header onAddClick={handleOpenAddRestaurantModal} />
      <main>
        <CategoryFilter onCategoryChange={setCategory} />
        <RestaurantList
          restaurants={filteredRestaurants}
          onRestaurantClick={handleOpenRestaurantDetailModal}
        />
      </main>
      <aside>
        {selectedRestaurant && (
          <RestaurantDetailModal
            restaurant={selectedRestaurant}
            onClose={handleCloseRestaurantDetailModal}
          />
        )}
        {isAddRestaurantModalOpen && (
          <AddRestaurantModal
            onClose={handleCloseAddRestaurantModal}
            onAddRestaurant={handleAddRestaurant}
          />
        )}
      </aside>
    </>
  );
}

export default App;

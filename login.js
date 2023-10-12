
import { Link } from "react-router-dom";
import Shimmer from "../shimmer";
import { useState,useEffect } from "react";

const Body = () => {
    const [loading, setLoading] = useState(true);
    const [originalRestaurantData, setOriginalRestaurantData] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
  useEffect(()=>{
    fetchUserData();
  },[])

  async function fetchUserData  ()  {
     const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0653205&lng=72.542296&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
   const json = await data.json();
  
   setLoading(false);
   const restaurantData = json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants.map((element)=>element.info);
   console.log(restaurantData);
    setOriginalRestaurantData(restaurantData);
    setRestaurant(restaurantData);
    
  }

  function RestaurantCard({ restaurant }) {

    
    return   (
      <div className="restaurant-card">
        <img
          className="restaurant-image"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            restaurant.cloudinaryImageId
          }
          alt={restaurant.name}
        />
        <Link to="/menu">{restaurant.name} </Link>
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisines.join(", ")}</p>
        <p>{restaurant.locality}</p>
        <p>Rating: {restaurant.avgRating}</p>
      </div>
    );
  }
  function RestaurantCardList({ restaurants }) {

    return (loading)?<Shimmer /> : (
      <div className="restaurant-card-list">
        {restaurants && restaurants.length!=0 ? restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} /> 
        )):<h1>No Data Found</h1>}
      </div>
    );
  }

  const handleSearch = () => {
    const filteredData = originalRestaurantData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredData);
    setRestaurant(filteredData)
    
  };

  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <RestaurantCardList restaurants={restaurant} />
    </div>
  );
};

export default Body;

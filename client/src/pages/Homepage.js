import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../img/shuffle-logo.png";

export default function Homepage() {
  const [location, setLocation] = useState({});
  let [distance, setDistance] = useState("1500");
  let [price, setPrice] = useState("2");
  let [chosenRestaurant, setChosenRestaurant]= useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(location);
    });
  }, []);

  const handleDistanceClick = (e) => {
    setDistance(e.target.dataset.radius);
  };

  const handlePriceClick = (e) => {
    setPrice(e.target.dataset.price);
  };

  const handleShuffle = (e) => {
    e.preventDefault()
    Axios.get("/api/googlePlaces", {
      params: {
        lat: location.lat,
        lng: location.lng,
        distance: distance,
        price: price,
      },
    }).then((res) => {
      let newRestaurants = []

      for(let i = 0; i < res.data.placeId.results.length; i++){
        if(res.data.placeId.results[i].price_level === parseInt(price)){
          newRestaurants.push(res.data.placeId.results[i])
          console.log(res.data.placeId.results[i])
        }
        console.log(newRestaurants)
      }

      setChosenRestaurant(newRestaurants[Math.floor(Math.random() * newRestaurants.length)])

    

    })
  };
  return (
    <div>
      <img src={logo} />
      <div>{chosenRestaurant.name}</div>
      <div className="filter-wrapper">
        <p className="category">Distance</p>
        <p data-radius="5000" onClick={(e) => handleDistanceClick(e)}>
          5 MI
        </p>
        <p data-radius="10000" onClick={(e) => handleDistanceClick(e)}>
          10 MI
        </p>
        <p data-radius="15000" onClick={(e) => handleDistanceClick(e)}>
          15 MI
        </p>
      </div>

      <div className="filter-wrapper">
        <p className="category">Price:</p>
        <p data-price="1" onClick={(e) => handlePriceClick(e)}>
          $
        </p>
        <p data-price="2" onClick={(e) => handlePriceClick(e)}>
          $$
        </p>
        <p data-price="3" onClick={(e) => handlePriceClick(e)}>
          $$$
        </p>
        <p data-price="4" onClick={(e) => handlePriceClick(e)}>
          $$$$
        </p>
      </div>

      <button onClick={(e) => handleShuffle(e)}>Shuffle</button>
    </div>
  );
}

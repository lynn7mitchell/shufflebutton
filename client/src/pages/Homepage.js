import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../img/shuffle-logo.png";

export default function Homepage() {
  const [restaurants, setRestaurants] = useState({});
  let [distance, setDistance] = useState("");
  let [price, setPrice] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(location);

      Axios.get("/api/googlePlaces", {
        params: {
          lat: location.lat,
          lng: location.lng,
        },
      }).then((res) => setRestaurants(res.data.placeId.results));
    });
  }, []);

  const handleDistanceClick = (e) => {
    setDistance(e.target.dataset.radius)
  };

  const handlePriceClick = (e) => {
    setPrice(e.target.dataset.price)
  };

  const handleShuffle = (e) =>{

  }
  return (
    <div>
      <img src={logo} />

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
          $$$
        </p>
      </div>
    </div>
  );
}

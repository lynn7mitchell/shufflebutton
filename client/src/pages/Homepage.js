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
    e.preventDefault()
    setDistance(e.target.dataset.radius);

    const distanceButtons = document.getElementsByClassName('distance-button')
    for(let i = 0; i < distanceButtons.length; i++){
      if(distanceButtons[i].classList[2] === 'selected-button'){
        distanceButtons[i].className = 'filter-button distance-button'
      }
    }
    e.target.className += ' selected-button'
  };

  const handlePriceClick = (e) => {
    e.preventDefault()
    setPrice(e.target.dataset.price);
    
    const priceButtons = document.getElementsByClassName('price-button')
    for(let i = 0; i < priceButtons.length; i++){
      if(priceButtons[i].classList[2] === 'selected-button'){
        priceButtons[i].className = 'filter-button price-button'
      }
    }
    e.target.className += ' selected-button'
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
      console.log(res.data.placeId.results)
      let newRestaurants = []

      for(let i = 0; i < res.data.placeId.results.length; i++){
        if(res.data.placeId.results[i].price_level <= parseInt(price)){
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
      <h2 className="chosen-restaurant">{chosenRestaurant.name}</h2>
      <div className="filter-wrapper">
        <p className="category">Distance</p>
        <button className="filter-button distance-button" data-radius="8047" onClick={(e) => handleDistanceClick(e)}>
          5 MI
        </button>
        <button className="filter-button distance-button" data-radius="16094" onClick={(e) => handleDistanceClick(e)}>
          10 MI
        </button>
        <button className="filter-button distance-button" data-radius="24140" onClick={(e) => handleDistanceClick(e)}>
          15 MI
        </button>
      </div>

      <div className="filter-wrapper distance">
        <p className="category">Price:</p>
        <button className="filter-button price-button" data-price="1" onClick={(e) => handlePriceClick(e)}>
          $
        </button>
        <button className="filter-button price-button" data-price="2" onClick={(e) => handlePriceClick(e)}>
          $$
        </button>
        <button className="filter-button price-button" data-price="3" onClick={(e) => handlePriceClick(e)}>
          $$$
        </button>
        <button className="filter-button price-button" data-price="4" onClick={(e) => handlePriceClick(e)}>
          $$$$
        </button>
      </div>

      <button onClick={(e) => handleShuffle(e)} className="shuffle-button">Shuffle</button>
    </div>
  );
}

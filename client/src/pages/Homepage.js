import React, { useState, useEffect } from 'react'
import Axios from 'axios';


export default function Homepage() {
    const [restaurants, setRestaurants] = useState({})


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(location)


            Axios.get('/api/googlePlaces', {
                params: {
                    lat: location.lat,
                    lng: location.lng
                }
            })
                .then(res => setRestaurants(res.data.placeId.results))

        });
    }, []);
    return (
        <div>
            
        </div>
    )
}

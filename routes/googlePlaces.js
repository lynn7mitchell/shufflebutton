module.exports = function (app) {
  Axios = require('axios')
  require('dotenv').config()

  app.get('/api/googlePlaces', (req, res) => {
    console.log(req.query.lat)

    const lat = req.query.lat
    const lng = req.query.lng
    const distance = req.query.distance
    const price = req.query.price
    console.log(lat, lng)
    Axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&price_level=${price}&radius=${distance}&type=restaurant&key=` + process.env.GOOGLE_PLACES_API_KEY)
      .then(response => res.send({ placeId: response.data }))
      .catch(err => {
        console.log(err)                     //Axios entire error message
        console.log(err.response.data.error) //Google API error message 
      })
  })

}
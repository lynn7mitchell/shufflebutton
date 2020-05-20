const app = require('express')();
const http = require('http').createServer(app);
require('dotenv').config()


// PORT
const PORT = process.env.PORT || 3001;



  require("./routes/googlePlaces")(app)


if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
  }
  // Send every other request to the React app
  // Define any API routes before this runs
  
  
 



http.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});


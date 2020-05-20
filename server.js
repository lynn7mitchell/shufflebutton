var express = require("express");
var path = require("path")
require('dotenv').config()

var app = express();

// PORT
const PORT = process.env.PORT || 3001;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


  require("./routes/googlePlaces")(app)


if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

  
  }
  // Send every other request to the React app
  // Define any API routes before this runs
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
  
 



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


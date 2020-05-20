const app = require('express')();
var path = require("path")
const http = require('http').createServer(app);
require('dotenv').config()


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
  
 



http.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});


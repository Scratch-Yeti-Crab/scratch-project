const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



// ------------- INTERNAL ROUTING ---------------- //



// ----------- DB ROUTING ------------------- //



// ------------- CLIENT ROUTING FOR REACT ROUTER -------------- //
app.get('/home', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});





app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

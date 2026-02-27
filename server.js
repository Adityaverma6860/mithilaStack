const express = require("express");
const app = express();
require('dotenv').config(); 
const db = require("./config/db.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); 



app.use("/api/auth", require("./routes/userRoutes.js"));
app.use("/api/plans", require("./routes/planRoutes.js"));
app.use("/api/subscription", require("./routes/subscriptionRoutes.js"));




app.listen(5000, () => {
  console.log("listen on  port 5000");
});


























const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/public", express.static("public"));
//Routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("bikebooking_app server");
});
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());

//connection
mongoose.connect("mongodb://localhost:27017/server2", () => {
  console.log("connected to db");
});

//routes
app.use(require("./routes/supplierForm"));
app.use(require("./routes/poForms"));
app.use(require("./routes/itemForm"));

//connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

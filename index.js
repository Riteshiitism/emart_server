const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var url = require("url");
var path = require("path");

dotenv.config();

// set up server

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://cool-dolphin-debfaf.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

// app.use(cors({
//   origin: ["http://localhost:3000","https://cool-dolphin-debfaf.netlify.app/"],
//   credentials: true
// }));
// cors: {
//   origin: ["http://localhost:3000", "https://cool-dolphin-debfaf.netlify.app/"];
// }

// app.all("*", function (req, res, next) {
//   let origin = req.headers.origin;
//   if (cors.origin.indexOf(origin) >= 0) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

var __filename = url.parse(process.cwd() + "/" + (process.argv[1] || ""));
__filename = path.resolve(__filename.pathname);

// set up routes
app.get("/", (req, res) => {
  res.send(`Hello to Backend of the API`);
});

app.use("/auth", require("./routers/userRouter"));
app.use("/product", require("./routers/productRouter"));
app.use("/tags", require("./routers/tagsRouter.js"));
app.use("/wishlist", require("./routers/wishlistRouter.js"));

app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 5000;
// connect to mongoDB
mongoose
  .connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // useCreateIndex:true
  })
  .then(() => {
    console.log("database connection is successful");
  })
  .catch((err) => {
    console.log("database connection failed with err " + err);
  });

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  popupRouter = require("../routes/popupRouter");
  dbKey = require("./dev");
  cors = require('cors');
  commentRouter = require("../routes/commentRouter");
  weekRouter = require("../routes/weekRouter");
  userRouter = require("../routes/userInfoRouter");

module.exports.init = () => {
  /* 
        connect to database
        - reference README for db uri
    */
  mongoose
    .connect(process.env.MONGO_URI || dbKey.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
    db = mongoose.connection;
  // // const db = config.get('config');
  // console.log(db);
  // mongoose
  //     .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  //     .then(() => console.log('MongoDB Connected...'))
  //     .catch(err => console.log(err));

  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  // initialize app
  const app = express();

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(cors());
  // add a router
  app.use('/api/popups', popupRouter);
  app.use('/api/comment', commentRouter);
  app.use('/api/week', weekRouter);
  app.use('/api/user', userRouter);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};

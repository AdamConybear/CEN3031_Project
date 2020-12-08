const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  // popupRouter = require("../routes/popupRouter");
  cors = require('cors');
  commentRouter = require("../routes/commentRouter");
  // weekRouter = require("../routes/weekRouter");
  userRouter = require("../routes/userInfoRouter");
  tipRouter = require("../routes/tipRouter");
  dbKey = require('./config');


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
  // app.use('/api/popups', popupRouter);
  app.use('/api/comment', commentRouter);
  // app.use('/api/week', weekRouter);
  app.use('/api/user', userRouter);
  app.use('/api/tip', tipRouter);
  
  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));
    // app.use(express.static('client/build'));
    app.get("/*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
    
  }

  return app;
};

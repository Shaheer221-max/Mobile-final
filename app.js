const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit"); //to limit ip request
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
let cors = require("cors");
var fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

// Set securty HTTP header
app.use(helmet());

//Global Middleware
//To limit req from same ip address
const limiter = rateLimit({
  max: 100, //so we allowed 100 req in
  windowMs: 60 * 60 * 1000, // one hours from same ip address
  message: "To many request from this IP, please try again in an hour",
});
//to connect to front end
app.use(cors());

app.use("/users", limiter); // /users ka mtlb is route sa jitna bhi route start hota ha un pa apply ho ga ya

//0) Importing routes
var usersRouter = require("./routes/users");
var notificationRouter = require("./routes/AdminNotificationRoute")
var newsfeedRouter = require("./routes/newsfeed")
var commentRouter = require("./routes/comment")
var likeRouter = require("./routes/like")
var groupRouter = require("./routes/group")
var eventRouter = require("./routes/event")
var clubRouter = require("./routes/club")
var itemcategoryRouter = require("./routes/itemcategory")
var itemRouter = require("./routes/item")
var CartRoute = require("./routes/cartRoute");

var skillRouter = require("./routes/skill");
var attendanceRouter = require("./routes/attendance");
var conversationRouter = require("./routes/conversation");
var groupconversationRouter = require("./routes/groupconversation")
var messageRouter = require("./routes/message");

var CustomerBuyingNotificationRoute = require("./routes/CustomerBuyingNotificationRoute");
var AdminOrderNotification = require("./routes/AdminOrderNotificationRoute");
var generalNotificationRoute = require("./routes/generalnotification")

var evaluationRouter = require("./routes/evaluation")
var dailyrecordRouter = require("./routes/dailyrecords")
var videocategoryRouter = require("./routes/videocategory")
var drillRouter = require("./routes/drill")



//This is middleware by using this we get body of req data
app.use(express.json());
app.use(bodyParser.json());

// it parses the data from cookie
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // ya req.body sa sara $ or dot . remove kar data ha or isi liya hum na isa body middleware k necha likha ha
//Data sanitization against XSS
app.use(xss()); // ya agr req ma html code aa gay ha to usa handle kara ga

//prevent paramter pollution
app.use(hpp());

//1) Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// To get header of request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use(
  fileupload({
    useTempFiles: true,
  })
);

//2) Routes

app.use("/users", usersRouter);
app.use("/newsfeed", newsfeedRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/group", groupRouter);

app.use("/event",eventRouter);
app.use("/club",clubRouter);
app.use("/itemcategory",itemcategoryRouter)
app.use("/item",itemRouter)
app.use("/cart", CartRoute);

app.use("/skill", skillRouter);
app.use("/attendance", attendanceRouter);
app.use("/conversation", conversationRouter);
app.use("/groupconversation",groupconversationRouter)
app.use("/message", messageRouter);
app.use("/evaluation",evaluationRouter)
app.use("/dailyrecords",dailyrecordRouter)
app.use("/notification",notificationRouter)
app.use("/generalnotification",generalNotificationRoute)

app.use("/videocategory",videocategoryRouter)
app.use("/drill",drillRouter)


app.use("/CustomerBuyingNotificationRoute", CustomerBuyingNotificationRoute);
app.use("/AdminOrderNotification", AdminOrderNotification);

//unhandled route middleware
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!!!`,
  });
});

//3)Start Server
module.exports = app;

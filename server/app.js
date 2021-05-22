const path = require('path');
const express = require('express');
// const redis = require("redis");
// const connectRedis = require("connect-redis");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require("dotenv").config();
const {
  NODE_ENV,
  // SESSION_NAME,
  // SESSION_SECRET,
  // SESSION_LIFETIME,
  // REDIS_HOST,
  // REDIS_PORT,
  // REDIS_PASSWORD,
} = process.env;

const Routes = require('./routes/routes')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Start express app
const app = express();
app.disable("x-powered-by");

//Mongo Session
require('dotenv').config({ path: '.env' });
const session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);

const DB = process.env.DATABASE.replace(
  '<NAME>',
  process.env.DATABASE_NAME
).replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

var store = new MongoDBStore({
  uri: DB,
  collection: 'sessions'

});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: store,
  cookie: {
    maxAge: parseInt(process.env.SESSION_LIFETIME), // 1 week
    httpOnly: true,
    secure: !(process.env.NODE_ENV === "development"),
    sameSite: false
  },
}));
//Mongo Session Logic End

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors({
  origin: [
    process.env.CLIENT_ORIGINS.split(',')
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

// app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '250kb' }));
app.use(express.urlencoded({ extended: true, limit: '250kb' }));
// app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/api', Routes);

app.all('*', (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.status(404).send(`
    <body style="background-color: #008080; margin: 0; padding: 0">
      <div style="height: 100vh; display: flex; justify-content: center; align-items: center; color: white ;">
          <pre style="font-size: 30px">Resource at <small style="opacity:0.9; font-weight:100">${req.originalUrl}</small> not found</pre>
      </div>
    </body>
  `)
});

app.use(globalErrorHandler);


module.exports = app;

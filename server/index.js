const express = require('express');
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

const databse = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT || 5000;

// Database connect
databse.connect();
// Middlewares
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.path}`);
//     next();
// });

app.use(cookieParser());

// allowing requests from http://localhost:3000 to your backend server
const allowedOrigins = [
    "http://localhost:3000",
    "https://study-notion-ed-tech-frontend-blond.vercel.app"
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      console.log("CORS incoming origin:", origin); 
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    next();
  });


// File upload middleware
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

// Connect to Coludinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running...."
    })
})

// Activate the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
    
})
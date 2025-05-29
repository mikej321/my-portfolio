const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Token middleware check function
const verifyToken = require("./middleware/authenticate");

// Routes
const adminLogin = require("./routes/adminLogin");
const adminSignup = require("./routes/adminSignup");
const posts = require("./routes/posts");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"]
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const FRONTEND_URL = ['http://localhost:5173', 'https://my-portfolio-frontend-ob69.onrender.com'];

// app.use(express.static(path.join(__dirname, "../frontend/dist/index.html")));

app.options("*", cors({
  origin: FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"]
}))

app.use("/test", (req, res) => {
  res.json({ message: "Backend is working" });
})

app.use("/adminLogin", adminLogin);

app.use("/adminSignup", adminSignup);

app.use("/posts", posts);

// Main React Route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// routes go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

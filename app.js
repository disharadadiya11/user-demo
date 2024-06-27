require("dotenv/config");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const { dbConnection } = require("./src/connection/db.connection");
const indexRoutes = require("./src/routes/index.routes");
const path = require("path");
const {
  applyAuthMiddleware,
} = require("./src/middleware/auth/apply.authMiddleware");
const app = express();

// ------------------------------------------  [ database connection ] ---------------------------------------
dbConnection();

// ------------------------------------------  [ middleware ] ---------------------------------------------------
// [ session ]
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    key: "disha-user-demo",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_EXPIRE_IN) },
  })
);
// [ cors , morgan ]
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// [ serve file ]
app.use("/src/uploads", express.static(__dirname + path.join("/src/uploads")));

// [ authorization ]
app.use(applyAuthMiddleware);

// [ routes ]
app.use("/", indexRoutes);

// -------------------------------------   [ server ] ---------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

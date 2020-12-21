import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

app.use(express.json());

app.use(morgan("dev"));

dotenv.config();

connectDB();

//route handling
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// tp use dirname in es7  syntaxt , dirname works  in common js syntax
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve((__dirname, "frontend", "build", "index.html")));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Runnung in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

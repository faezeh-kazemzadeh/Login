import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import imageRouter from "./routes/image.route.js";
import contentRouter from "./routes/content.route.js";
import categoryRouter from "./routes/category.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

// app.use(cors({"origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204 }));
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static("upload"));





app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/image", imageRouter);
app.use('/api/content',contentRouter)
app.use('/api/category',categoryRouter)

app.use((err, req, res, next) => {
  console.error(err)

  const statusCode = err.statusCode || 500;
  const message = err.message || `Internal Server Error:)`;


  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

})

app.listen("3000", () => {
  console.log("app is running on port 3000");
});
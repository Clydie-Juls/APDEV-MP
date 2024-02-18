import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const apiRouter = express.Router();

mongoose.connect("mongodb://localhost:12345/T3Db");

// middleware setup
app.use(express.urlencoded({ extended: true }));
// GET HTTP requests
apiRouter.get("/users/:id", (req, res) => {
  res.status(200).send("User sent successfully");
});

apiRouter.get("/posts/:id", (req, res) => {
  res.status(200).send("post sent successfully");
});

apiRouter.get("/search", (req, res) => {
  res.status(200).send("searched list sent successfully");
});

// POST HTTP requests
apiRouter.post("/login", (req, res) => {
  res.status(201).send("Login successful");
});

apiRouter.post("/signup", (req, res) => {
  res.status(201).send("Signup successful");
});

apiRouter.post("/editlogininfo", (req, res) => {
  res.status(201).send("edit login info successful");
});

apiRouter.post("/writepost", (req, res) => {
  res.status(201).send("write post successful");
});

apiRouter.post("/editposts/:id", (req, res) => {
  res.status(201).send("edit post successful");
});

apiRouter.post("/writecomment", (req, res) => {
  res.status(201).send("write comment successful");
});

apiRouter.post("/editcomments/:id", (req, res) => {
  res.status(201).send("edit comment successful");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

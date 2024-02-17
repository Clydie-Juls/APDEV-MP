import express from "express";

const app = express();
const port = 3000;
const apiRouter = express.Router();

// middleware setup
app.use(express.urlencoded({ extended: true }));

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

apiRouter.post("/editpost/:id", (req, res) => {
  res.status(201).send("edit post successful");
});

apiRouter.post("/writecomment", (req, res) => {
  res.status(201).send("write comment successful");
});

apiRouter.post("/editcomment/:id", (req, res) => {
  res.status(201).send("edit comment successful");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

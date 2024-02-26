import express from "express";
import mongoose from "mongoose";

import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

const app = express();
const port = 3000;
const apiRouter = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/T3Db");

// middleware setup
app.use(express.urlencoded({ extended: true }));
// GET HTTP requests
apiRouter.get("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    // user db fetch
    const user = User.findById(id);
    // post db fetch
    // idk if i need to sort it
    const posts = Post.find({ posterId: id });

    res.status(200).json(JSON.stringify({ user: user, posts: posts }));
  } catch (e) {
    // TODO: provide more http status codes
    res.status(404).json(JSON.stringify({ error: e.message }));
  }
});

apiRouter.get("/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    // post db fetch
    const post = Post.findById(id);
    // post db fetch
    // idk if i need to sort it
    const comments = post.populate("comments");

    res.status(200).json(JSON.stringify({ post: post, comments: comments }));
  } catch (e) {
    // TODO: provide more http status codes
    res.status(404).json(JSON.stringify({ error: e.message }));
  }
});

// /search?q=magic&t=a,b,c&do=asc&po=asc
apiRouter.get("/search", async (req, res) => {
  const query = req.query.q || '';
  const tags = req.query.t || [];
  
  const dateOrder = req.query.do || 'asc';
  const popularityOrder = req.query.po || 'asc';
  
  const posts = await Post.find({
    'title': { '$regex': query, '$options': 'i' }
  });

  // TODO
  res.status(200).json(posts);
});

// POST HTTP requests
apiRouter.post("/login", (req, res) => {
  res.status(201).send("Login successful");
});

apiRouter.post("/signup", (req, res) => {
  User.create({ 
    username: req.body.username,
    password: req.body.password,
    description: '',
    picture: null
  });

  // TODO: Auto log-in the user.
  res.status(201).redirect('/');
});

apiRouter.post("/editlogininfo", (req, res) => {
  res.status(201).send("edit login info successful");
});

apiRouter.post("/writepost", async (req, res) => {
  // TODO
  const poster = await User.findOne();

  Post.create({
    title: req.body.title,
    posterId: poster._id,
    body: req.body.body,
    comments: [],
    reactions: {
      likerIds: [],
      dislikerIds: []
    },
    tags: []
  });
  
  // TODO: Redirect user to the page of their post
  res.status(201).redirect('/');
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

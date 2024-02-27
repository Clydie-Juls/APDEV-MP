import express from "express";
import mongoose from "mongoose";
import multer from 'multer';

import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";
import { isAuth, setLoggedInUser, loggedInUsername } from '../middleware/auth.js';

const app = express();
const port = 3000;
const apiRouter = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/T3Db");

// middleware setup
app.use(multer().array());
app.use(express.urlencoded({ extended: true }));

// GET HTTP requests
apiRouter.get("/users/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // user db fetch
    const user = User.findById(id);
    // post db fetch
    // idk if i need to sort it
    const posts = Post.find({ posterId: id });
    const userObj = (await user).toJSON();
    const postsObj = (await posts).toJSON();
    res.status(200).json(JSON.stringify({ user: userObj, posts: postsObj }));
  } catch (e) {
    // TODO: provide more http status codes
    res.status(404).json(JSON.stringify({ error: e.message }));
  }
});

apiRouter.get("/posts/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // post db fetch
    const post = Post.findById(id);
    // post db fetch
    // idk if i need to sort it
    const comments = post.populate("comments");
    const postObj = (await post).toJSON();
    const commentsObj = (await comments).toJSON();

    res
      .status(200)
      .json(JSON.stringify({ post: postObj, comments: commentsObj }));
  } catch (e) {
    // TODO: provide more http status codes
    res.status(404).json(JSON.stringify({ error: e.message }));
  }
});

// Example: '/search?q=post%20title&t=tag1,tag2&do=asc&po=desc'
apiRouter.get("/search", async (req, res) => {
  const titleQuery = req.query.q || '';
  const tagsQuery = (req.query.t) ? req.query.t.split(',') : null;
  
  const dateOrder = req.query.do || 'asc';
  const popularityOrder = req.query.po || 'asc';

  const posts = await Post.aggregate([
    {
      $match: {
        title: { 
          $regex: titleQuery, 
          $options: 'i' 
        },
        ...(tagsQuery && { tags: { $all: tagsQuery } })
      }
    },
    {
      $addFields: {
        likeCount: { $size: "$reactions.likerIds" },
        dislikeCount: { $size: "$reactions.dislikerIds" }
      }
    },
    {
      $addFields: {
        likeToDislikeRatio: {
          $cond: [
            { $eq: ["$dislikeCount", 0] }, "$likeCount",
            { $divide: ["$likeCount", "$dislikeCount"] }
          ]
        }
      },
    },
    {
      $sort: {
        title: 1,
        uploadDate: (dateOrder === 'asc') ? 1 : -1,
        likeToDislikeRatio: (popularityOrder === 'asc') ? 1 : -1 
      }
    }
  ]);

  res.status(200).json(posts);
});

// POST HTTP requests
apiRouter.post("/login", async (req, res) => {
  // TODO: password check
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user === null) {
    res.status(401).send('Login not successful.');
  } else {
    setLoggedInUser(req.body.username);
    res.status(201).send("Login successful");
  }
});

apiRouter.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    description: "",
    picture: null,
  });

  // TODO: Auto log-in the user.
  res.status(201).redirect("/");
});

apiRouter.post("/editlogininfo", (req, res) => {
  res.status(201).send("edit login info successful");
});

apiRouter.post("/writepost", async (req, res) => {
  const poster = await User.findOne({ name: loggedInUsername });
  
  // TODO: Remove this
  const li = [];
  const di = [];
  (await User.find()).forEach(u => ((Math.random() < 0.5) ? li.push(u._id) : di.push(u._id)));

  Post.create({
    title: req.body.title,
    posterId: poster._id,
    body: req.body.body,
    comments: [],
    reactions: {
      // likerIds: [],
      // dislikerIds: []
      likerIds: li,
      dislikerIds: di
    },
    tags: req.body.tags
  });

  // TODO: Redirect user to the page of their post
  res.status(201).send('/');
});

apiRouter.post("/editposts/:id", isAuth, (req, res) => {
  res.status(201).send("edit post successful");
});

apiRouter.post("/writecomment", isAuth, (req, res) => {
  res.status(201).send("write comment successful");
});

apiRouter.post("/editcomments/:id", isAuth, (req, res) => {
  res.status(201).send("edit comment successful");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

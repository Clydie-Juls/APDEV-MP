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
apiRouter.get("/posts/search", async (req, res) => {
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


// POST and PUT HTTP requests

apiRouter.post("/account/login", async (req, res) => {
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

apiRouter.post("/account/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    description: "",
    picture: null,
  });

  // TODO: Auto log-in the user.
  res.status(201).redirect("/");
});

apiRouter.put("/account/edit", isAuth, async (req, res) => {
  const { username, password, description, picture } = req.body;
  const poster = await User.findOne({ name: loggedInUsername });

  const { nModified } = await User.updateOne(
    {
      _id: poster._id
    },
    {
      username,
      password,
      description,
      picture
    }
  );

  res.status(nModified === 0 ? 204 : 200);
});

apiRouter.post("/posts/write", async (req, res) => {
  const poster = await User.findOne({ name: loggedInUsername });
  
  const newPost = await Post.create({
    title: req.body.title,
    posterId: poster._id,
    body: req.body.body,
    reactions: {
      likerIds: [],
      dislikerIds: []
    },
    tags: req.body.tags
  });

  res.status(201).send(`/post/${newPost._id}`);
});

apiRouter.put("/posts/edit/:id", isAuth, async (req, res) => {
  const { id } = req.params;

  await Post.updateOne(
    {
      _id: id
    },
    {
      title: req.body.title,
      body: req.body.body, 
      tags: req.body.tags 
    }
  );

  res.status(200).send(`/post/${id}`);
});

apiRouter.post('/posts/like/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const liker = await User.findOne({ name: loggedInUsername });

  const { nModified } = await Post.updateOne(
    {
      _id: id
    },
    { 
      $addToSet: { 'reactions.likerIds': liker._id },
      $pull: { 'reactions.dislikerIds': liker._id },
    }
  );

  res.status(nModified === 0 ? 204 : 200);
});

apiRouter.post('/posts/dislike/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const disliker = await User.findOne({ name: loggedInUsername });
  
  const { nModified } = await Post.updateOne(
    {
      _id: id
    },
    { 
      $addToSet: { 'reactions.dislikerIds': disliker._id },
      $pull: { 'reactions.likerIds': disliker._id },
    }
  );

  res.status(nModified === 0 ? 204 : 200);
});

apiRouter.post('/posts/unreact/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const unreacter = await User.findOne({ name: loggedInUsername });
  
  const { nModified } = await Post.updateOne(
    {
      _id: id
    },
    { 
      $pull: { 
        'reactions.likerIds': unreacter._id,
        'reactions.dislikerIds': unreacter._id,
      },
    }
  );

  res.status(nModified === 0 ? 204 : 200);
});

apiRouter.post("/comments/write", isAuth, async (req, res) => {
  const commenter = await User.findOne({ name: loggedInUsername });
  
  const newComment = await Comment.create({
    commenterId: commenter._id,
    commentRepliedToId: req.body.commentRepliedToId,
    body: req.body.body,
    reactions: {
      likerIds: [],
      dislikerIds: []
    }
  });

  res.status(201).json(newComment);
});

apiRouter.put("/comments/edit/:id", isAuth, async (req, res) => {
  const { id } = req.params;

  const editedComment = await Comment.updateOne(
    {
      _id: id
    },
    {
      body: req.body.body
    }
  );

  res.status(200).json(editedComment);
});

apiRouter.post('/comments/like/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const liker = await User.findOne({ name: loggedInUsername });
  
  const { nModified } = await Comment.updateOne(
    {
      _id: id
    },
    { 
      $pull: { 
        $addToSet: { 'reactions.likerIds': liker._id },
        $pull: { 'reactions.dislikerIds': liker._id },
      },
    }
  );

  res.status(nModified === 0 ? 204 : 200); 
});

apiRouter.post('/comments/dislike/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const disliker = await User.findOne({ name: loggedInUsername });
  
  const { nModified } = await Comment.updateOne(
    {
      _id: id
    },
    { 
      $pull: { 
        $addToSet: { 'reactions.dislikerIds': disliker._id },
        $pull: { 'reactions.likerIds': disliker._id },
      },
    }
  );

  res.status(nModified === 0 ? 204 : 200);  
});

apiRouter.post('/comments/unreact/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const unreacter = await User.findOne({ name: loggedInUsername });
  
  const { nModified } = await Comment.updateOne(
    {
      _id: id
    },
    { 
      $pull: { 
        'reactions.likerIds': unreacter._id,
        'reactions.dislikerIds': unreacter._id,
      },
    }
  );

  res.status(nModified === 0 ? 204 : 200);  
});


// DELETE HTTP Requests

apiRouter.delete('/users/:id', isAuth, async (req, res) => {
  const currUser = await User.findOne({ name: loggedInUsername });  

  await User.deleteOne({ _id: currUser._id });
  await Post.deleteMany({ posterId: currUser._id });
  await Comment.deleteMany({ commenterId: currUser._id });

  // TODO: Sign user out properly.
  setLoggedInUser('');

  res.status(200);
});

apiRouter.delete('/posts/:id', isAuth, async (req, res) => {
  const { id } = req.params;

  // TODO: Invalid post handling
  await Post.findByIdAndDelete(id);
  await Comment.deleteMany({ postId: id });

  res.status(200);
});

apiRouter.delete('/comments/:id', isAuth, async (req, res) => {
  const { id } = req.params;

  // TODO: Invalid comment handling
  await Comment.deleteOne({ _id: id });

  res.status(200);
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

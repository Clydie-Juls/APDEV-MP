import express from "express";
import mongoose  from "mongoose";
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
apiRouter.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The user does not exist.' });
      return;
    }
  
    // user db fetch
    const user = await User.findById(id).lean();
    
    // post db fetch
    // idk if i need to sort it
    const posts = await Post.find({ posterId: id }).lean();
    const comments = await Comment.find({ postId: id }).lean();
  
    res.status(200).json({ 
      user, 
      posts, 
      comments
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/posts/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
    // post db fetch
    const post = await Post.findById(id).lean();
    const comments = await post.populate("comments").lean();
  
    res.status(200).json(({ post, comments }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Example: '/search?q=post%20title&t=tag1,tag2&do=asc&po=desc'
apiRouter.get("/posts/search", async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// POST and PUT HTTP requests

apiRouter.post("/account/login", async (req, res) => {
  try {
    // TODO: password check
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (user === null) {
      res.status(401).send('Login not successful.');
    } else {
      setLoggedInUser(req.body.username);
      res.status(201).send("Login successful");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/account/signup", (req, res) => {
  try {
    User.create({
      username: req.body.username,
      password: req.body.password,
      description: "",
      picture: null,
    });
  
    // TODO: Auto log-in the user.
    res.status(201).redirect("/");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/account/edit", isAuth, async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/posts/write", isAuth, async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/posts/edit/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/posts/like/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot like the post.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/posts/dislike/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot dislike the post.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/posts/unreact/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot unreact the post.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/comments/write", isAuth, async (req, res) => {
  try {
    const commenter = await User.findOne({ name: loggedInUsername });
  
    const newComment = await Comment.create({
      commenterId: commenter._id,
      commentRepliedToId: req.body.commentRepliedToId,
      body: req.body.body,
      reactions: {
        likerIds: [],
        dislikerIds: []
      }
    }).lean();
  
    res.status(201).json({ comment: newComment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/comments/edit/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The comment does not exist.' });
      return;
    }
  
    const editedComment = await Comment.updateOne(
      {
        _id: id
      },
      {
        body: req.body.body
      }
    ).lean();
  
    res.status(200).json({ comment: editedComment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/comments/like/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The comment does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot like the comment.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/comments/dislike/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The comment does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot dislike the comment.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post('/comments/unreact/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The comment does not exist.' });
      return;
    }
  
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
  
    if (nModified === 0) {
      res.status(204).json({ error: 'Cannot unreact the comment.' });
    } else {
      res.status(200);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// DELETE HTTP Requests

apiRouter.delete('/users/:id', isAuth, async (req, res) => {
  try {
    const currUser = await User.findOne({ name: loggedInUsername });  

    await User.deleteOne({ _id: currUser._id });
    await Post.deleteMany({ posterId: currUser._id });
    await Comment.deleteMany({ commenterId: currUser._id });
  
    // TODO: Sign user out properly.
    setLoggedInUser('');
  
    res.status(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.delete('/posts/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The post does not exist.' });
      return;
    }
  
    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ postId: id });
  
    res.status(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.delete('/comments/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'The comment does not exist.' });
      return;
    }
  
    await Comment.deleteOne({ _id: id });
  
    res.status(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

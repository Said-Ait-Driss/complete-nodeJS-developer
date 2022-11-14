//* the main purpose of this api is that testing it with:
// * Jest for making test
// * superTest : for making a request against our server

const express = require("express");
const app = express();

const posts = [
  {
    id: 1,
    title: "post 1",
  },
  {
    id: 2,
    title: "post 2",
  },
  {
    id: 3,
    title: "post 3",
  },
];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/add-post/:title/:description", (req, res) => {
  const { title, description } = req.params;
  if (!title || !description) {
    res.sendStatus(401);
  }
  const newPost = {
    id: posts.length + 1,
    title,
    description,
  };
  posts.push(newPost);
  res.send(newPost);
  res.end();
});

app.post("/delete-post/:postId", (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(400).json({
      error: "post id is required !",
    });
  }
  const post = posts.find((post) => post.id === postId);

  if (!post)
    return res.status(400).json({
      error: `post with id ${postId} couldn't be found !`,
    });

  posts = posts.filter((post) => post.id != postId);
  return res.status(201).json(post);
});

//* when testing u must comment the app.listen
// app.listen(300, () => console.log("server listening on 300"));

module.exports = app;

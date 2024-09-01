const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {
  123: [
    {
      id: "92df7ac8",
      content: "hello, world",
    },
  ],
  456: [
    {
      id: "12ab7ac8",
      content: "sup, world",
    },
    {
      id: "73ab7ac9",
      content: "cool, world",
    },
  ],
};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, (req, res) => {
  console.log("Listening on 4001");
});

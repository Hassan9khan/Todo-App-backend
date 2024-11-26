import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

const users = [
  {
    title: "Hassan",
    id: 1732642389282,
  },
];

// add user
app.post("/user", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({
      message: "title is required",
    });
    return;
  }

  users.push({
    title,
    id: Date.now(),
  });

  res.status(201).json({
    message: "title is added",
    data: users,
  });
});

// get users
app.get("/users", (req, res) => {
  res.status(200).json({
    data: users,
  });
});

// get a single user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }
  res.status(200).json({
    data: users[index],
  });
});
// delete todo
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "no user found",
    });
    return;
  }

  users.splice(index, 1);
  res.status(200).json({
    message: "user is deleted",
    data: users,
  });
});

// edit todo
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;


  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "no user found",
    });
    return;
  }

  if (!title) {
    res.status(400).json({
      message: "title is required",
    });
    return;
  }

  users[index].title = title;

  res.status(200).json({
    message: "user is edited",
    data: users,
  });
});

// server

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

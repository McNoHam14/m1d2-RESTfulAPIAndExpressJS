// CRUD endpoints

import Express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const authorsRouter = Express.Router();

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
console.log(
  "TARGET:",
  join(dirname(fileURLToPath(import.meta.url)), "authors.json")
);

// POST

authorsRouter.post("/", (req, res) => {
  res.send({ message: "Hello I am the POST endpoint" });
  console.log("A", req.body);
  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
  };

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  authors.push(newAuthor);

  console.log("B", newAuthor);

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.status(201).send({ id: newAuthor.id });
});

authorsRouter.get("/", (req, res) => {
  const fileContentAsBuffer = fs.readFileSync(authorsJSONPath);
  console.log("C", fileContentAsBuffer);

  console.log("D", JSON.parse(fileContentAsBuffer));
  const authors = JSON.parse(fileContentAsBuffer);

  res.send(authors);
});

export default authorsRouter;

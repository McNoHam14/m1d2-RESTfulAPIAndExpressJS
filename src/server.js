import Express from "express";

const server = Express();

const port = 3002;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

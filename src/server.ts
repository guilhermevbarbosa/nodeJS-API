import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.post("/", (request, response) => {
  console.log(request.body);
  return response.json({ message: "Hello World" });
});

app.listen(8080);

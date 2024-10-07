const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack to the console
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

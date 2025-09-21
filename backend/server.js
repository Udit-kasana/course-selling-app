require("dotenv").config();

const { connectDB } = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listenig on port ` + PORT);
  });
});

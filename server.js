require("dotenv").config();

const { createApp } = require("./app");
const { myDataSource } = require("./api/models/myDataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  try {
    await myDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been intialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    myDataSource.destroy();
    console.error(err);
  }
};

startServer();

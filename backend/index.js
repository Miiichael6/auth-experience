require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/config/database");

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  await sequelize.sync({ force: false });
  console.log(`server is listen the port http://localhost:4000`);
});

const app = require("./src/app");
const { sequelize } = require("./src/config/database");

app.listen(4000, async () => {
  await sequelize.sync({ force: false });
  console.log(`server is listen the port http://localhost:4000`);
});

// {
//   "nombre": "Michael",
//   "email": "cdlsmichael@gmail.com",
//   "password": "michael16"
// }

// {
//   "nombre": "Michael",
//   "email": "michael@gmail.com",
//   "password": "michael16"
// }

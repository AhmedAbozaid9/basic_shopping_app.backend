import { Sequelize } from "sequelize";

const sequelize = new Sequelize("basic_shopping_app", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;

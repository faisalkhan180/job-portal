const Sequelize = require('sequelize');

const connection = new Sequelize("uop_jobs", "root", "root", {
  host: "localhost",
  logging: true,
  dialect: "mysql",
});

const connectToMySql = () => {
  connection
    .authenticate()
    .then(() => {
      console.log("connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connection, connectToMySql };

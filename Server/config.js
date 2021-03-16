const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  isocountriesdata: process.env.ISOCOUNTRIES,
  gocalertsdata: process.env.GOCALERTS,
  alertcollection: process.env.ALERTCOLLECTION,
  advisorycollection: process.env.ADVISORYCOLLECTION,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
  server: process.env.SERVER,
};

const { graphql, server } = require("./config");
const port = process.env.PORT || 5000;
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const path = require("path"); // needed for refresh
//const cors = require("cors");
//app.use(cors());
app.use(express.static("public"));
app.get("/*", (request, response) => {
  // needed for refresh
  response.sendFile(path.join(__dirname, "public/index.html"));
});
app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.listen(port);
console.log(
  `Server ready at ${server}:${port}${graphql} - ${process.env.NODE_ENV}`
);

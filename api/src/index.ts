import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 Server ready at http://localhost:${port}/`);
  // console.log('Running a GraphQL API server at http://localhost:4000/graphql')
});

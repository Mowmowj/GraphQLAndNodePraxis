var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    herry: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  herry: ()=> {
      return `lkfjlkadflkjals`
  }
};

var app = express();

app.use(cors())
//挂载中间件
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,//开启浏览器调试工具
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
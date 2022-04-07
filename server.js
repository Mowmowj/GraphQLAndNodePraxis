var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
#Query 是一种对象类型
#Query 是所有查询的入口点
#Query 必须有 不能重复  
  type Query {
    hello: String
    herry: String
    floatNum: Float
    isSaler: Boolean
    cardID: ID
    user:User
  }
  type User {
    name:String
    age:Int
    pc:Display
    record: [String]
    total:[Detail]
  }
  type Detail {
    money:Int
    address: String
  }
  type Display {
    screen:String
    light: Int  
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  herry: ()=> {
      return `lkfjlkadflkjals`
  },
  floatNum: ()=>{
      return 123213.123
  },
  isSaler: ()=>{
      return false
  },
  cardID: ()=>{
        return '可能是吧临安酸辣粉看啊森林等奖啊赛季分了'
  },
  user: ()=>{
    return {
        name: 'Jack',
        age: 18,
        pc:{
            screen:'TFT',
            light: 300,
        },
        record: ['2022','2021','2023'],
        total :[
            {money:30,address:'北京市'},
            {money:30999,address:'深圳市'}
        ]
    }
  },

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
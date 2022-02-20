const express = require('express');
const app = express();
const PORT = 6969;
const userData = require('./MOCK_DATA.json');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLSchema } = graphql;
const { graphqlHTTP } = require('express-graphql');


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Get all users
        getAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return userData
            }
        }
    }
})


const schema = new GraphQLSchema({ query: RootQuery });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
})
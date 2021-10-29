const {ApolloServer, PubSub} = require("apollo-server")
const db = require('./db')
const Query = require("./resolver/Query")
const Mutation = require("./resolver/Mutaion")
const Subscription = require("./resolver/Subscription")
// const {GraphQLFileLoader} = require("@graphql-tools/graphql-file-loader")
// const {loadSchemaSync} = require("@graphql-tools/load")
// const {addResolversToSchema} = require("@graphql-tools/schema")
// const {join} = require('path')
const typeDefs = require("./schema.js")
// const schema = loadSchemaSync(join(__dirname, './schema.graphql'), {
//     loaders: [new GraphQLFileLoader()]
// })
// prisma インスタンスの取得
const {prisma} = require('./prisma/generated/prisma-client')

// PubSubのインスタンスを作成、サブスクリプションを利用可能に
const pubSub = new PubSub()

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context: {
        prisma,
        db,
        pubSub
    }
})

server.listen().then(({url, subscriptionsUrl}) => {
    console.log(`? Server ready at ${url}`)
    console.log(`? Subscriptions ready at ${subscriptionsUrl}`)
})
const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        posts(query: String): [Post!]!
        users(query: String): [User!]!
    }

    type Mutation {
        createPost(data: CreatePostInput!): Post!
        deletePost(id: ID!): Post!
        updatePost(id: ID!, data: UpdatePostInput!): Post!
        createUser(data: CreateUserInput): AuthPayload!
        login(data: LoginUserInput): AuthPayload!
    }

    # サブスクリプション
    type Subscription {
        post: PostSubscriptionPayload!
    }

    input CreatePostInput {
        title: String!
        author: String!
    }

    input UpdatePostInput {
        title: String!
        author: String!
    }
    
    input CreateUserInput {
        name: String!
        email: String!
        password: String!
        # 投稿するユーザのID
        PostedUser: ID!
    }
    
    input LoginUserInput {
        email: String!
        password: String!
    }

    type Post {
        id: ID!
        title: String!
        author: String!
        # リレーション
        postedUser: User!
        # 作成時間と更新時間
        updatedAt: String!
        createdAt: String!
    }
    
    type User {
        id: ID!
        name: String!
        email: String
        password: String!
        # リレーション
        posts: [Post!]!
        # 作成時間と更新時間
        updatedAt: String!
        createdAt: String!
    }
    
    type AuthPayload {
        token: String!
        user: User!
    }

    enum MutationType {
        CREATED
        UPDATED
        DELETED
    }

    # サブスクリプションのフィールド
    type PostSubscriptionPayload {
        mutation: MutationType
        data: Post!
    }
`
module.exports = typeDefs
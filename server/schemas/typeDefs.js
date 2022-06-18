const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(username: String!): User
        getAllUsers: [User]
    }

    type Mutation {
        createUser(email: String!, username: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(bookId: String!): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
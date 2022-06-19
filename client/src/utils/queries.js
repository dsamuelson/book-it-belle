import { gql } from '@apollo/client'

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                authors
                description
                title
                bookId
                image
                link
            }
       
        }
    }
`;

export const GET_ALL = gql`
    query getAllUsers {
        getAllUsers {
            _id
            username
        }
    }
`;
import { gql } from '@apollo/client'

export const typeDefs = gql`
  scalar Upload

  type Image {
    name: String!
    url: String!
    slug: String!
    mimetype: String!
    height: String
    width: String
    size: Int
  }

  type Query {
    viewer: Boolean
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): Image
    multipleUploads(files: [Upload!]!): [Image]
  }
`

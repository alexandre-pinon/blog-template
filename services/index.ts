import { request, gql } from 'graphql-request'

const GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            title
            slug
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(GRAPHQL_API, query)

  return result.postsConnection.edges
}

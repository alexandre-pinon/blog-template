import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''
const GRAPHQL_TOKEN = process.env.GRAPHCMS_TOKEN || ''

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const graphQLClient = new GraphQLClient(GRAPHQL_API, {
    headers: {
      authorization: `Bearer ${GRAPHQL_TOKEN}`,
    },
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) {
        id
      }
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result)
}

export default createComment

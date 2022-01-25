import { ApolloServer } from 'apollo-server-express'
import { Request, Response, Router } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../apollo/schema'

const runMiddleware = (req: Request, res: Response, fn: Router) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  },
})

const startServer = apolloServer.start()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: Request & NextApiRequest, res: Response & NextApiResponse) {
  console.time('SERVER START')
  await startServer
  const apolloMiddleware = apolloServer.getMiddleware({
    path: '/api/graphql',
  })
  console.timeEnd('SERVER START')
  await runMiddleware(req, res, apolloMiddleware)
}

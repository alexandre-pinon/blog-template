import { ApolloServer } from 'apollo-server-express'
import { Request, Response, Router } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../apollo/schema'
import { connectToDatabase } from '../../mongoose'

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
  console.time('Server started in')
  await connectToDatabase()
  await startServer
  const apolloMiddleware = apolloServer.getMiddleware({
    path: '/api/graphql',
  })
  console.timeEnd('Server started in')
  await runMiddleware(req, res, apolloMiddleware)
}

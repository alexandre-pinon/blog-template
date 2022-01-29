import { ApolloServer } from 'apollo-server-express'
import express, { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphqlUploadExpress } from 'graphql-upload'
import { schema } from '../../apollo/schema'
import { connectToDatabase } from '../../mongoose'
import runExpressMiddleware from '../../utils/run-express-middleware'
import typeis from 'type-is'

const apolloServer = new ApolloServer({
  schema,
  context({ req, res }) {
    // console.log({ req, res })
    return { req, res }
  },
})
const startServer = apolloServer.start()
const graphqlUploadMiddleware = graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })

export const config = {
  api: {
    bodyParser: false,
  },
}

type NextExpressRequest = NextApiRequest & Request
type NextExpressResponse = NextApiResponse & Response

const withExpress = (handler: Function) => (req: NextExpressRequest, res: NextExpressResponse) => {
  // req.is = function is(types) {
  //   var arr = types

  //   // support flattened arguments
  //   if (!Array.isArray(types)) {
  //     arr = new Array(arguments.length)
  //     for (var i = 0; i < arr.length; i++) {
  //       arr[i] = arguments[i]
  //     }
  //   }
  //   console.log(req.headers['content-type'])
  //   console.log(types, [types], typeis(this, arr), typeis(req, [types]))
  //   return typeis(this, arr)
  // }
  req.is = express.request.is
  return handler(req, res)
}

const handler = async (req: Request, res: Response) => {
  console.time('Server started in')

  await connectToDatabase()
  await startServer

  // app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  // apolloServer.applyMiddleware({ app, path: '/api/graphql' })

  const apolloMiddleware = apolloServer.getMiddleware({
    path: '/api/graphql',
  })

  console.timeEnd('Server started in')

  console.log('MIDDLE ONE', req.body)
  console.log(req.is('multipart/form-data'))
  await runExpressMiddleware(req, res, graphqlUploadMiddleware)
  console.log('MIDDLE TWO', req.body)
  await runExpressMiddleware(req, res, apolloMiddleware)
}

export default withExpress(handler)

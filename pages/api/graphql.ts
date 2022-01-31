import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphqlUploadExpress } from 'graphql-upload'

import runExpressMiddleware from '../../utils/runExpressMiddleware'
import { schema } from '../../lib/apollo/schema'
import { connectToDatabase } from '../../lib/mongoose'
import { ImageModel } from '../../lib/mongoose/models'
import { withExpress } from '../../types'
import { ImageDatasource } from '../../lib/apollo/dataSources'

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    imageDatasource: new ImageDatasource(ImageModel),
  }),
  context({ req, res }) {
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

const handler = async (req: NextApiRequest & withExpress, res: NextApiResponse) => {
  console.time('Server started in')

  req.is = express.request.is

  await connectToDatabase()
  await startServer

  const apolloMiddleware = apolloServer.getMiddleware({
    path: '/api/graphql',
  })

  console.timeEnd('Server started in')

  await runExpressMiddleware(req, res, graphqlUploadMiddleware)
  await runExpressMiddleware(req, res, apolloMiddleware)
}

export default handler

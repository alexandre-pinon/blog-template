import express from 'express'
import { ImageDatasource } from '../lib/apollo/dataSources'

export type WithExpress = {
  is: typeof express.request.is
}

export interface CustomDataSources {
	imageDatasource: ImageDatasource
}

export interface CustomContext {
  // credentials: Credentials;
}

export interface CustomResolversContext extends CustomContext {
  dataSources: CustomDataSources;
}
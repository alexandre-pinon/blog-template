import { Storage } from '@google-cloud/storage'
import path from 'path'
import { bucketName } from '../config/env'

const storage = new Storage({
  keyFilename: path.join(__dirname, '/../../../../gcp-service-account.json'),
})

export const storageBucket = storage.bucket(bucketName as string)

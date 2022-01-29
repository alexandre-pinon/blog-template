import { Storage } from '@google-cloud/storage'
import path from 'path'

const storage = new Storage({
  keyFilename: path.join(__dirname, '/../../../../gcp-service-account.json'),
})
console.log('PATH', path.join(__dirname, '/../../../../gcp-service-account.json'))
console.log('PATH', __dirname)
const bucketName = process.env.GCP_BUCKET_NAME

if (!bucketName) {
  throw new Error('Please define the GCP_BUCKET_NAME environment variable inside .env.local')
}

const storageBucket = storage.bucket(bucketName)

export { bucketName, storageBucket }

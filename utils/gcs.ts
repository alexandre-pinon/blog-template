import path from 'path'
import slugify from 'slugify'
import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'
import { v4 as uuidv4 } from 'uuid'

import { appName, bucketName } from '../config/env'
import { Image } from '../types'
import { extractFileExtension } from './helpers'

const storage = new Storage({
  keyFilename: path.join(__dirname, '/../../../../gcp-service-account.json'),
})

export const storageBucket = storage.bucket(bucketName as string)

export const uploadImageToGCS = async (file: FileUpload) => {
  const { createReadStream, filename, mimetype } = await file
  const { trimedFileName, fileExtension } = extractFileExtension(filename)
  const slug = `${slugify(trimedFileName, { lower: true })}-${uuidv4()}${fileExtension}`

  const stream = createReadStream()
  const storageBucketFile = storageBucket.file(`${appName}/${slug}`)
  const outputStream = storageBucketFile.createWriteStream({
    resumable: false,
    gzip: true,
  })

  return await new Promise<Image>((resolve, reject) =>
    stream
      .pipe(outputStream)
      .on('finish', async () => {
        await storageBucketFile.makePublic()
        const url = `${storageBucketFile.storage.apiEndpoint}/${storageBucket.name}/${storageBucketFile.name}`
        resolve({ name: filename, slug, url, mimetype, size: storageBucketFile.metadata.size })
      })
      .on('error', (error: Error) => reject(error))
  )
}

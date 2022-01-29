import { STORAGE_POST_POLICY_BASE_URL } from '@google-cloud/storage/build/src/file'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { bucketName, storageBucket } from '../../utils/gcp-storage'

export const ImageResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (_parent: any, { file }: Record<string, FileUpload>) => {
      console.log('UPLOAD START!')
      const { createReadStream, filename, mimetype, encoding } = await file
      console.log({ filename, mimetype, encoding })
      const stream = createReadStream()
      const storageBucketFile = storageBucket.file(filename)
      const outputStream = storageBucketFile.createWriteStream({
        resumable: false,
        gzip: true,
      })

      console.log('uploading ...')
      await new Promise((resolve, reject) =>
        stream
          .pipe(outputStream)
          .on('finish', async () => {
            console.log('finished upload!')
            console.log('making it public ...')
            const res = await storageBucketFile.makePublic()
            console.log('DONE!')
            console.log(res[0].object)
            console.log(`${STORAGE_POST_POLICY_BASE_URL}/${bucketName}/${res[0].object}`)
            resolve(true)
          })
          .on('error', () => reject(false))
      )

      return { filename, mimetype, encoding }
    },
  },
}

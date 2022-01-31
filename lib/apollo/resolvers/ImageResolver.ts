import slugify from 'slugify'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { storageBucket } from '../../../utils/gcs'
import { appName } from '../../../config/env'
import { Image } from '../../../types'
import { MongoDataSource } from 'apollo-datasource-mongodb'
import { CustomResolversContext } from '../../../types/Customs'

export const ImageResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (
      _parent: any,
      { file }: Record<string, FileUpload>,
      { dataSources }: CustomResolversContext
    ) => {
      const image = await uploadFile(file)
      const res = dataSources.imageDatasource.insertImages(image)
      res.then((res) => console.log({ res })).catch((err) => console.error(err))
      return image
    },
    multipleUploads: async (
      _parent: any,
      { files }: Record<string, FileUpload[]>,
      { dataSources }: CustomResolversContext
    ) => {
      const images = await Promise.all(files.map(uploadFile))
      const res = dataSources.imageDatasource.insertImages(images)
      res.then((res) => console.log({ res })).catch((err) => console.error(err))
      return images
    },
  },
}

const uploadFile = async (file: FileUpload) => {
  const { createReadStream, filename, mimetype } = await file
  const slugifiedFileName = slugify(filename, { lower: true })

  const stream = createReadStream()
  const storageBucketFile = storageBucket.file(`${appName}/${slugifiedFileName}`)
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

        resolve({ name: slugifiedFileName, url, mimetype, size: storageBucketFile.metadata.size })
      })
      .on('error', (error: Error) => reject(error))
  )
}

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

  // TODO: Check if file exists before upload to GCS
  Mutation: {
    singleUpload: async (
      _parent: any,
      { file }: Record<string, FileUpload>,
      { dataSources }: CustomResolversContext
      ) => {
      const imageData = await uploadImageToGCS(file)
      dataSources.imageDatasource.insertImagesIfNotExists([imageData])
      return imageData
    },
    multipleUploads: async (
      _parent: any,
      { files }: Record<string, FileUpload[]>,
      { dataSources }: CustomResolversContext
    ) => {
      const imagesData = await Promise.all(files.map(uploadImageToGCS))
      dataSources.imageDatasource.insertImagesIfNotExists(imagesData)
      return imagesData
    },
  },
}

const uploadImageToGCS = async (file: FileUpload) => {
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

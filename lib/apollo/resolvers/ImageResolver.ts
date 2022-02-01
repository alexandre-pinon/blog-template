import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImageToGCS } from '../../../utils/gcs'
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
      const imageData = await uploadImageToGCS(file)
      const res = await dataSources.imageDatasource.insertImages([imageData])
      console.log({ res })
      return imageData
    },
    multipleUploads: async (
      _parent: any,
      { files }: Record<string, FileUpload[]>,
      { dataSources }: CustomResolversContext
    ) => {
      const imagesData = await Promise.all(files.map(uploadImageToGCS))
      const res = await dataSources.imageDatasource.insertImages(imagesData)
      console.log({ res })
      return imagesData
    },
  },
}

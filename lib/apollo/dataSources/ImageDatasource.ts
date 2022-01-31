import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'bson'
import { Image, ImageDoc } from '../../../types'

export default class ImageDatasource extends MongoDataSource<ImageDoc> {
  getImage(id: string | ObjectId) {
    return this.findOneById(id)
  }
  async insertImagesIfNotExists(imagesData: Image[]) {
    const results = await Promise.all(imagesData.map(async (data) => (await this.findByFields({ url: data.url }))[0]))
    const alreadyUploadedUrls = (results.filter((v) => v) as ImageDoc[]).map((data) => data.url)
    const imagesToUpload = imagesData.filter((data) => !alreadyUploadedUrls.includes(data.url))

    return await this.model.create(imagesToUpload)
  }
}

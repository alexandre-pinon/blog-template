import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'bson'
import { Image, ImageDoc } from '../../../types'

export default class ImageDatasource extends MongoDataSource<ImageDoc> {
  getImage(id: string | ObjectId) {
    return this.findOneById(id)
  }
  async insertImages(images: Image | Image[]) {
    return await this.model.create(images)
  }
}

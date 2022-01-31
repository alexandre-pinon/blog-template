import mongoose from 'mongoose'
import { mongoURI } from '../../config/env'

let isConnected = false

const db = mongoose.connection
db.on('connecting', () => console.log('Connecting to mongoose...'))
db.on('connected', () => console.log('Mongoose connected'))
db.on('disconnected', () => console.warn('Mongoose disconnected'))
db.on('error', (error) => console.error('MONGOOSE CONNECTION ERROR', error))

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log(`Connected to ${db.name} using cached connection`)
    return
  }

  try {
    await mongoose.connect(mongoURI as string, { serverSelectionTimeoutMS: 5000 })
    isConnected = db.readyState === 1
  } catch (error) {
    console.error('INITIAL MONGOOSE CONNECTION ERROR', error)
  }
}

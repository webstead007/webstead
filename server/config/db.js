import mongoose from 'mongoose'

export async function connectDatabase() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required to start the API.')
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
  console.log('Connected to MongoDB')
}

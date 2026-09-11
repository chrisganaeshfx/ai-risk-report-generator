import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDb } from '../models/db'
import { SiteModel } from '../models/site.model'

async function seedAndVerify(): Promise<void> {
  await connectDb()

  await SiteModel.updateOne(
    { code: 'SYN-SG-001' },
    {
      $set: {
        name: 'Synthetic Singapore Warehouse',
        jurisdiction: 'SG',
        facilityType: 'Warehouse',
      },
    },
    {
      upsert: true,
    },
  )

  const record = await SiteModel.findOne({
    code: 'SYN-SG-001',
  })
    .select('code name jurisdiction facilityType -_id')
    .lean()

  if (!record) {
    throw new Error('Test record was written but could not be read back')
  }

  console.log('MongoDB test record read successfully:', record)
}

seedAndVerify()
  .catch((error) => {
    console.error('MongoDB verification failed:', error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })

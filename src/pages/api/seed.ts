import { connect, disconnect } from '@/database/connect'
import { initialData } from '@/database/data'
import { Product } from '@/models/Product'
import { type NextApiRequest, type NextApiResponse } from 'next'

interface Data {
  message: string
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  try {
    await connect()
    await Product.deleteMany()
    await Product.insertMany(initialData.products)
    await disconnect()
    res.status(200).json({ message: 'Data initialized successfully' })
  } catch (error) {
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

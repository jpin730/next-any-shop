import { connect, disconnect } from '@/database/connect'
import { initialData } from '@/database/data'
import { Order } from '@/models/Order'
import { Product } from '@/models/Product'
import { User } from '@/models/User'
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

    await User.deleteMany()
    await User.insertMany(initialData.users)

    await Product.deleteMany()
    await Product.insertMany(initialData.products)

    await Order.deleteMany()

    await disconnect()

    res.status(200).json({ message: 'Data initialized successfully' })
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

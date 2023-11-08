import { connect, disconnect } from '@/database/connect'
import { isValidGender } from '@/database/data'
import { type IProduct } from '@/interfaces/IProduct'
import { Product } from '@/models/Product'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IProduct[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      return

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { gender = 'all' } = req.query
    const filter =
      gender !== 'all' && isValidGender(gender as string) ? { gender } : {}
    await connect()
    const products = await Product.find(filter)
      .select('title images price inStock slug -_id')
      .lean()
    await disconnect()
    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

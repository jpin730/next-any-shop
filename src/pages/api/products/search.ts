import { connect, disconnect } from '@/database/connect'
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
      await searchProducts(req, res)
      return

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { q = '' } = req.query

    if (q.length === 0) {
      res.status(400).json({
        message: 'Query value is required',
      })
      return
    }

    await connect()
    const products = await Product.find({
      $text: { $search: q.toString().toLowerCase() },
    })
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

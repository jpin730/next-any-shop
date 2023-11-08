import { connect, disconnect } from '@/database/connect'
import { type IProduct } from '@/interfaces/IProduct'
import { Product } from '@/models/Product'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IProduct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'GET': {
      await getProductBySlug(req, res)
      return
    }

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  try {
    await connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug }).lean()
    await disconnect()

    if (product === null) {
      res.status(404).json({
        message: 'Product not found',
      })
      return
    }

    res.json(product)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

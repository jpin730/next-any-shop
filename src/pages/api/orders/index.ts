import { connect, disconnect } from '@/database/connect'
import { type IOrder } from '@/interfaces/IOrder'
import { Order } from '@/models/Order'
import { Product } from '@/models/Product'
import { isValidToken } from '@/utils/jwt'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IOrder

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'POST':
      await createOrder(req, res)
      return

    default: {
      res.status(400).json({ message: 'Bad request' })
    }
  }
}

const createOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { orderItems, total } = req.body as IOrder
    const { token = '' } = req.cookies

    if (token === '') {
      throw new Error('Token is required')
    }

    const userId = await isValidToken(token)

    const productsIds = orderItems.map(({ _id }) => _id)
    await connect()
    const dbProducts = await Product.find({ _id: { $in: productsIds } })

    const subTotal = orderItems.reduce((prev, curr) => {
      const currentPrice = dbProducts.find(({ id }) => id === curr._id)?.price
      if (currentPrice == null) {
        throw new Error('Check the cart again, product does not exist')
      }
      return currentPrice * curr.quantity + prev
    }, 0)

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)
    const backendTotal = subTotal * (taxRate + 1)

    if (total !== backendTotal) {
      throw new Error('The total does not match the amount')
    }

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
    await newOrder.save()
    await disconnect()

    res.status(201).json(newOrder)
  } catch (error: any) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: error.message ?? 'Server error' })
  }
}

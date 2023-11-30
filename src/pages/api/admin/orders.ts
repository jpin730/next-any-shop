import { connect, disconnect } from '@/database/connect'
import { type IOrder } from '@/interfaces/IOrder'
import { Order } from '@/models/Order'
import { isValidObjectId } from 'mongoose'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IOrder[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'GET': {
      await getOrders(req, res)
      return
    }

    case 'DELETE': {
      await deleteOrder(req, res)
      return
    }

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

const getOrders = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    await connect()
    const orders = await Order.find()
      .sort({ createdAt: 'desc' })
      .populate('user', 'name email')
      .lean()
    await disconnect()
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { id = '' } = req.query

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid id' })
      return
    }

    await connect()
    const order = await Order.findByIdAndDelete(id)
    await disconnect()

    if (order == null) {
      res.status(404).json({ message: 'Order not found' })
      return
    }

    res.status(200).json({ message: 'Order deleted' })
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

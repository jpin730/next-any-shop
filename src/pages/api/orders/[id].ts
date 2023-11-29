import { connect, disconnect } from '@/database/connect'
import { Order } from '@/models/Order'
import { isValidToken } from '@/utils/jwt'
import { isValidObjectId } from 'mongoose'
import { type NextApiRequest, type NextApiResponse } from 'next'

interface Data {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'PUT':
      await payOrder(req, res)
      return

    case 'DELETE':
      await deleteOrder(req, res)
      return

    default: {
      res.status(400).json({ message: 'Bad request' })
    }
  }
}

const payOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { id } = req.query
    const { token = '' } = req.cookies

    if (token === '') {
      res.status(400).json({ message: 'Token is required' })
      return
    }

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Id is not valid' })
      return
    }

    const userId = await isValidToken(token)

    await connect()
    const order = await Order.findById(id)

    if (order == null || order.user?.toString() !== userId) {
      await disconnect()
      res.status(404).json({ message: 'Order not found' })
      return
    }

    order.isPaid = true
    order.paidAt = new Date().toISOString()
    await order.save()
    await disconnect()
    res.status(201).json({ message: 'Order paid' })
  } catch (error: any) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: error.message ?? 'Server error' })
  }
}

const deleteOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { id } = req.query
    const { token = '' } = req.cookies

    if (token === '') {
      res.status(400).json({ message: 'Token is required' })
      return
    }

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Id is not valid' })
      return
    }

    const userId = await isValidToken(token)

    await connect()
    const order = await Order.findById(id)

    if (order == null || order.user?.toString() !== userId) {
      await disconnect()
      res.status(404).json({ message: 'Order not found' })
      return
    }

    await Order.findByIdAndDelete(id)
    await disconnect()
    res.status(201).json({ message: 'Order deleted' })
  } catch (error: any) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: error.message ?? 'Server error' })
  }
}

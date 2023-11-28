import { type IOrder } from '@/interfaces/IOrder'
import { isValidObjectId } from 'mongoose'
import { connect, disconnect } from '../connect'
import { Order } from '@/models/Order'

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null
  }

  await connect()
  const order = await Order.findById(id).lean()
  await disconnect()

  if (order == null) {
    return null
  }

  return JSON.parse(JSON.stringify(order))
}

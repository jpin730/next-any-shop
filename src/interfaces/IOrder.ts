import { type IAddress } from './IAddress'
import { type ICartProduct } from './ICartProduct'
import { type IUser } from './IUser'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: ICartProduct[]
  address: IAddress
  paymentResult?: string
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  isPaid: boolean
  paidAt?: string
  createdAt?: string
  updatedAt?: string
}

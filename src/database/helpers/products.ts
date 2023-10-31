import { Product } from '@/models/Product'
import { connect, disconnect } from '../connect'
import { type IProduct } from '@/interfaces/IProduct'
import { type ProductSlug } from '@/interfaces/ProductSlug'

export const getProductBySlug = async (
  slug: string,
): Promise<IProduct | null> => {
  try {
    await connect()
    const product = await Product.findOne({ slug }).lean()
    await disconnect()
    return product === null ? null : JSON.parse(JSON.stringify(product))
  } catch {
    await disconnect()
    return null
  }
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  try {
    await connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await disconnect()
    return slugs
  } catch {
    await disconnect()
    return []
  }
}

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  try {
    term = term.toString().toLowerCase()
    await connect()
    const products = await Product.find({
      $text: { $search: term },
    })
      .select('title images price inStock slug -_id')
      .lean()
    await disconnect()
    return products
  } catch {
    await disconnect()
    return []
  }
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    await connect()
    const products = await Product.find().lean()
    await disconnect()
    return JSON.parse(JSON.stringify(products))
  } catch {
    await disconnect()
    return []
  }
}

export interface IProduct {
  _id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: IProductSize[]
  slug: string
  tags: string[]
  title: string
  type: IProductType
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

export type IProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export type IProductType = 'shirts' | 'pants' | 'hoodies' | 'hats'

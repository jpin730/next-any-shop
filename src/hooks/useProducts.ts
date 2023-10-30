import useSWR, { type SWRConfiguration } from 'swr'
import { type IProduct } from '../interfaces/IProduct'

interface IUseProducts {
  products: IProduct[]
  isLoading: boolean
  error: any
}

export const useProducts = (
  url: string,
  config: SWRConfiguration = {},
): IUseProducts => {
  const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config)

  return {
    products: Array.isArray(data) ? data : [],
    isLoading,
    error,
  }
}

import Cookies from 'js-cookie'
import { type IAddress } from '@/interfaces/IAddress'

export const getAddressFromCookies = (): IAddress => {
  const {
    firstName = '',
    lastName = '',
    address = '',
    address2 = '',
    zip = '',
    city = '',
    state = '',
    phone = '',
  } = JSON.parse(Cookies.get('address') ?? '{}')

  return {
    firstName,
    lastName,
    address,
    address2,
    zip,
    city,
    state,
    phone,
  }
}

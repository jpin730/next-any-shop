import { sign, verify } from 'jsonwebtoken'

export const signToken = (_id: string, email: string): string => {
  if (process.env.JWT_SECRET_SEED === undefined) {
    throw new Error('JWT_SECRET_SEED is undefined')
  }

  return sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: '1h' })
}

export const isValidToken = async (token: string): Promise<string> => {
  if (process.env.JWT_SECRET_SEED === undefined) {
    throw new Error('JWT_SECRET_SEED is undefined')
  }

  return await new Promise<string>((resolve, reject) => {
    try {
      verify(token, process.env.JWT_SECRET_SEED as string, (err, payload) => {
        if (err !== null) throw new Error('JWT is invalid')

        const { _id } = payload as { _id: string }
        resolve(_id)
      })
    } catch (error) {
      reject(error)
    }
  })
}

import { connect, disconnect } from '@/database/connect'
import { User } from '@/models/User'
import { isValidToken, signToken } from '@/utils/jwt'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data =
  | { message: string }
  | {
      token: string
      user: {
        email: string
        name: string
        role: string
      }
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'GET':
      await checkJWT(req, res)
      return

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

const checkJWT = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { token = '' } = req.cookies

    if (token === '') {
      res.status(400).json({
        message: 'Token is required',
      })
      return
    }

    const userId = await isValidToken(token)

    await connect()
    const user = await User.findById(userId).lean()
    await disconnect()

    if (user === null) {
      res.status(400).json({ message: 'User does not exists' })
      return
    }

    const { _id, email, role, name } = user

    res.status(200).json({
      token: signToken(_id, email),
      user: {
        email,
        role,
        name,
      },
    })
  } catch (error) {
    console.error(error)
    await disconnect()

    const { message = '' } = error as { message: string }
    if (message === 'JWT is invalid') {
      res.status(401).json({
        message: 'Token is not valid',
      })
      return
    }

    res.status(500).json({ message: 'Server error' })
  }
}

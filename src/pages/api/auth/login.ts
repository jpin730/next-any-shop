import { connect, disconnect } from '@/database/connect'
import { User } from '@/models/User'
import { signToken } from '@/utils/jwt'
import { compareSync } from 'bcryptjs'
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
    case 'POST': {
      await loginUser(req, res)
      return
    }

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

const loginUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { email = '', password = '' } = req.body

    if (email === '' || password === '') {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    await connect()
    const user = await User.findOne({ email })
    await disconnect()

    if (user === null) {
      res.status(400).json({ message: 'Email or password are invalid (1)' })
      return
    }

    if (!compareSync(password, user.password as string)) {
      res.status(400).json({ message: 'Email or password are invalid (2)' })
      return
    }

    const { role, name, _id } = user

    const token = signToken(_id, email)

    res.status(200).json({
      token,
      user: {
        email,
        role,
        name,
      },
    })
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

import { connect, disconnect } from '@/database/connect'
import { User } from '@/models/User'
import { signToken } from '@/utils/jwt'
import { isValidEmail } from '@/utils/validators'
import { hashSync } from 'bcryptjs'
import { type NextApiResponse, type NextApiRequest } from 'next'

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
    case 'POST':
      await registerUser(req, res)
      return

    default:
      res.status(400).json({
        message: 'Bad request',
      })
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const {
      email = '',
      password = '',
      name = '',
    } = req.body as { email: string; password: string; name: string }

    if (email === '' || password === '' || name === '') {
      res.status(400).json({
        message: 'Email, password and name are required',
      })
      return
    }

    if (password.length < 6) {
      res.status(400).json({
        message: 'Password must be at least 6 characters',
      })
      return
    }

    if (name.length < 2) {
      res.status(400).json({
        message: 'Name must be at least 2 characters',
      })
      return
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        message: 'Email is not valid',
      })
      return
    }

    await connect()
    const user = await User.findOne({ email })

    if (user !== null) {
      res.status(400).json({
        message: 'Email is already registered',
      })
      return
    }

    const newUser = new User({
      email: email.toLowerCase(),
      password: hashSync(password),
      role: 'client',
      name,
    })

    await newUser.save({ validateBeforeSave: true })
    await disconnect()

    const { _id, role } = newUser

    const token = signToken(_id, email, role)

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

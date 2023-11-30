import { connect, disconnect } from '@/database/connect'
import { type IUser } from '@/interfaces/IUser'
import { User } from '@/models/User'
import { isValidObjectId } from 'mongoose'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IUser[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  switch (req.method) {
    case 'GET': {
      await getUsers(req, res)
      return
    }

    case 'DELETE': {
      await deleteUser(req, res)
      return
    }

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

const getUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    await connect()
    const users = await User.find().select('-password').lean()
    await disconnect()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  try {
    const { id = '' } = req.query

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid id' })
      return
    }

    await connect()
    const user = await User.findByIdAndDelete(id)
    await disconnect()

    if (user == null) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    console.error(error)
    await disconnect()
    res.status(500).json({ message: 'Server error' })
  }
}

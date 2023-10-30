import mongoose, { ConnectionStates } from 'mongoose'

export const connect = async (): Promise<void> => {
  const connection = mongoose.connections.at(0)

  if (
    connection !== undefined &&
    connection.readyState === ConnectionStates.connected
  )
    return

  await mongoose.connect(process.env.DB_CNN ?? '')
}

export const disconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') return

  // eslint-disable-next-line no-console
  console.log('process.env.NODE_ENV', process.env.NODE_ENV) // TODO: Remove this line

  const connection = mongoose.connections.at(0)
  if (
    connection !== undefined &&
    connection.readyState === ConnectionStates.disconnected
  )
    return
  await mongoose.disconnect()
}

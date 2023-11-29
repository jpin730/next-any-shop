import { AdminLayout } from '@/components/shared/AdminLayout'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { Typography } from '@mui/material'
import { type NextPage } from 'next'
import { useState } from 'react'

const AdminOrdersPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return (
    <AdminLayout title="Admin Orders">
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Typography variant="h1" sx={{ mb: 3 }}>
          Admin Orders
        </Typography>
      )}
    </AdminLayout>
  )
}

export default AdminOrdersPage

import { AdminLayout } from '@/components/shared/AdminLayout'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { Typography } from '@mui/material'
import { type NextPage } from 'next'
import { useState } from 'react'

const AdminUsersPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return (
    <AdminLayout title="Admin Users">
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Typography variant="h1" sx={{ mb: 3 }}>
          Admin Users
        </Typography>
      )}
    </AdminLayout>
  )
}

export default AdminUsersPage

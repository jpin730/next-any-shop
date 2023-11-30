import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { AdminLayout } from '@/components/shared/AdminLayout'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { type IUser } from '@/interfaces/IUser'
import { Grid } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid'
import { type NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { anyShopApi } from '@/api/anyShopApi'

const AdminUsersPage: NextPage = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<IUser[]>('/api/admin/users')
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (data != null) {
      setUsers(data)
    }

    if (error != null) {
      setUsers([])
    }
  }, [data, error])

  if (isLoading || isValidating) return <FullScreenLoading />

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await anyShopApi.delete('/admin/users', { params: { id } })
      await mutate()
    } catch {}
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'FullName', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          color="error"
          icon={<DeleteIcon />}
          key={row.id}
          label="Delete"
          disabled={row.role === 'admin'}
          onClick={() => {
            void deleteUser(row.id)
          }}
        />,
      ],
    },
  ]

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }))

  return (
    <AdminLayout title="Admin Users">
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default AdminUsersPage

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { AdminLayout } from '@/components/shared/AdminLayout'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { type IOrder } from '@/interfaces/IOrder'
import { type IUser } from '@/interfaces/IUser'
import { Chip, Grid, Link } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid'
import { type NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { anyShopApi } from '@/api/anyShopApi'
import { toCurrency } from '@/utils/toCurrency'
import NextLink from 'next/link'

const AdminOrdersPage: NextPage = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<IOrder[]>('/api/admin/orders')
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    if (data != null) {
      setOrders(data)
    }

    if (error != null) {
      setOrders([])
    }
  }, [data, error])

  if (isLoading || isValidating) return <FullScreenLoading />

  const deleteOrder = async (id: string): Promise<void> => {
    try {
      await anyShopApi.delete('/admin/orders', { params: { id } })
      await mutate()
    } catch {}
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '',
      width: 250,
      renderCell: ({ row }) => (
        <NextLink href={`/order/${row.id}`}>
          <Link component="span" underline="always">
            {row.id}
          </Link>
        </NextLink>
      ),
    },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'FullName', width: 300 },
    { field: 'total', headerName: 'Total', width: 200 },
    {
      field: 'isPaid',
      headerName: 'Paid',
      renderCell: ({ row }) =>
        (row.isPaid as boolean) ? (
          <Chip variant="outlined" label="Paid" color="secondary" />
        ) : (
          <Chip variant="outlined" label="Pending" />
        ),
    },
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
            void deleteOrder(row.id)
          }}
        />,
      ],
    },
  ]

  const rows = orders.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: toCurrency(order.total),
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }))

  return (
    <AdminLayout title="Admin Orders">
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default AdminOrdersPage

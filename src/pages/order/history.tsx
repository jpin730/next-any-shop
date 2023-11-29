import { anyShopApi } from '@/api/anyShopApi'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { getOrdersByUser } from '@/database/helpers/orders'
import { type IOrder } from '@/interfaces/IOrder'
import { isValidToken } from '@/utils/jwt'
import { toCurrency } from '@/utils/toCurrency'
import { Box, Chip, Grid, Link, Typography } from '@mui/material'
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid'
import { type GetServerSideProps, type NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Row {
  id: string
  paid: boolean
  fullName: string
  total: string
  orderId: string
}

interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order id', minWidth: 250 },
    { field: 'fullName', headerName: 'Full Name', minWidth: 200 },
    {
      field: 'paid',
      headerName: 'Paid',
      description: 'Show information if the order is paid"',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (params.row.paid as boolean) ? (
          <Chip color="secondary" label="Paid" variant="outlined" />
        ) : (
          <Chip label="Unpaid" variant="outlined" />
        )
      },
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 100,
      align: 'right',
      headerAlign: 'right',
    },

    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 250,
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box display="flex" gap={2}>
            <NextLink href={`/order/${params.row.orderId}`}>
              <Link component="span" underline="hover">
                View order
              </Link>
            </NextLink>

            <Link
              color="error"
              component="button"
              underline="hover"
              onClick={() => {
                void deleteOrder(params.row.orderId)
              }}
              disabled={deleting}
            >
              Delete order
            </Link>
          </Box>
        )
      },
    },
  ]

  const rows: GridRowsProp<Row> = orders.map(
    ({ isPaid, address, _id, total }) => ({
      id: _id?.toUpperCase() ?? '',
      paid: isPaid,
      fullName: `${address.firstName} ${address.lastName}`,
      total: toCurrency(total),
      orderId: _id ?? '',
    }),
  )

  const deleteOrder = async (orderId: string): Promise<void> => {
    setDeleting(true)
    try {
      await anyShopApi.delete(`/orders/${orderId}`)
      void router.replace(router.asPath)
    } catch (error) {
      console.error(error)
    }
    setDeleting(false)
  }

  return (
    <ShopLayout title="Order History" pageDescription="Order history">
      <Typography variant="h1" component="h1">
        Order History
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies

  let userId = ''

  try {
    userId = await isValidToken(token)
  } catch (error) {
    userId = ''
  }

  if (token === '' || userId === '') {
    return {
      redirect: {
        destination: `/auth/login?p=${encodeURIComponent('/order/history')}`,
        permanent: false,
      },
    }
  }

  const orders = await getOrdersByUser(userId)

  return {
    props: {
      orders,
    },
  }
}

export default HistoryPage

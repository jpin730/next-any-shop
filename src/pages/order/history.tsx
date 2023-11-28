import { anyShopApi } from '@/api/anyShopApi'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { getOrdersByUser } from '@/database/helpers/orders'
import { type IOrder } from '@/interfaces/IOrder'
import { isValidToken } from '@/utils/jwt'
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
  id: number
  paid: boolean
  fullName: string
}

interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const deleteOrder = async (orderId: string): Promise<void> => {
    setDeleting(true)
    try {
      await anyShopApi.delete<IOrder>(`/orders/${orderId}`)
      void router.replace(router.asPath)
    } catch (error) {
      console.error(error)
    }
    setDeleting(false)
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: '', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 300 },
    {
      field: 'paid',
      headerName: 'Paid',
      description: 'Show information if the order is paid"',
      width: 200,
      renderCell: (params) => {
        return (params.row.paid as boolean) ? (
          <Chip color="secondary" label="Paid" variant="outlined" />
        ) : (
          <Chip label="Unpaid" variant="outlined" />
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box display="flex" gap={2}>
            <NextLink target="_blank" href={`/order/${params.row.orderId}`}>
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
    ({ isPaid, address, _id }, idx) => ({
      id: idx + 1,
      paid: isPaid,
      fullName: `${address.firstName} ${address.lastName}`,
      orderId: _id,
    }),
  )

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
